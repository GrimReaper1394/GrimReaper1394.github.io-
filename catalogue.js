// creating an object 
var laptops = {
    img1: {
        name: "Acer Predator Helios 300",
        image: "images/predator-helio300.png",
        price: 30000
    },
    img2: {
        name: "Dell Alienware Area-51M",
        image: "images/alienware-area-51m.png",
        price: 50000
    },
    img3: {
        name: "Asus ROG Zephyrus S ultra slim",
        image: "images/Asus-ROG-Zephyus-S.png",
        price: 28000
    },
    img4: {
        name: "Lenovo Legion Y Series Y7000",
        image: "images/lenovo-legion-y.webp",
        price: 27000
    },
    img5: {
        name: "Samsung Notebook Flash",
        image: "images/samsung.png",
        price: 12000
    },
    img6: {
        name: "Xiaomi Mi Notebook Pro 15.6",
        image: "images/miBook.png",
        price: 14000
    },
    img7: {
        name: "Dell xps series xps 15",
        image: "images/dellxps.png",
        price: 35000
    },
    img8: {
        name: "Acer Aspire series E1",
        image: "images/Acer Aspire E1.png",
        price: 11000
    },
    img9: {
        name: "Razer Blade 15",
        image: "images/razer-blade-15-og-non-mercury.png",
        price: 59000
    },
    img10: {
        name: "Apple MacBook Pro® 13",
        image: "images/macbookpro.png",
        price: 34000
    }
}

// function to get items that will be stored in the cart 
function getCart(item) {
    var ss = sessionStorage.getItem("cart")
    if (!ss) ss = "[]"
    ss = JSON.parse(ss)
    return ss
}

// this function will add an item to the cart by first getting the item using getCart
function addToCart(item) {
    var ss = getCart()
    // the item is then pushed into the array ss which stores it in a session storage.
    ss.push(item)
    sessionStorage.setItem("cart", JSON.stringify(ss))
}

function removeFromCart(item) {
    var ss = getCart()
    var indexOf = ss.indexOf(item)
    // splicing item from ss by index to remove it from ss
    ss.splice(indexOf, 1)
    sessionStorage.setItem("cart", JSON.stringify(ss))
}

function loadCatalogue() {
    // chaining functions using $(".AddToCart").click
    $(".AddToCart").click(function() {
        var parent = $(this).parents(".card-body").find(".modal.fade")
        addToCart(parent.attr('id'))
        var total = 0
        var items = getCart()
        for (var item of items) {
            total += laptops[item].price
        }
        // alert for running total
        alert("R" + total)
    })
}

// ..................from loadCart the following happens................
function loadCart() {
    // getting items stored in getCart and placing them in ss
    var ss = getCart()
    var total = 0
    for (var item of ss) {
        // cloning an html element so that we can have a template for how our cart items should........... #cloneItem
        var element = $("#CloneItem").clone()
        // getting the id and defining the item name through the id
        element.attr("id", item)
        // getting the item name based on id based key
        element.find(".name").text(laptops[item].name)
        // adding tax
        total += laptops[item].price * 1.14
        element.find(".price").text((laptops[item].price * 1.14).toFixed(0))
        element.find(".img-fluid").attr("src", laptops[item].image)

        $(".content-fluid").append(element)
    }

    $(".CartTotalAndCheckout .total").text("R" + total.toFixed(0))

    $(".RemoveFromCart").click(function() {
        var removedItem = $(this).parents(".card")
        var id = removedItem.attr("id")
        total -= laptops[id].price * 1.14
        $(".CartTotalAndCheckout .total").text("R" + total.toFixed(0))
        removeFromCart(id)
        removedItem.remove()
    })

    // preventing the refresh to load problem
    $(".checkout").click(function(e) {
        e.preventDefault()
        console.log($("dialog"))
        $("dialog").get(0).showModal()
    })

    // implimenting delivery costs
    var checkoutWithExtra = 0
    $(".CartTotalAndCheckout .total").text((total * 1.14).toFixed(0))
    $("dialog .options > label input").change(function() {
        if ($(this).is(":checked") && $(this).attr("id") == "delivery") {
            $(this).parent().parent().find(".hidden").slideDown()
            var checkoutWithExtra = (total * 1.17).toFixed(0)
            $(".CartTotalAndCheckout .total").text(checkoutWithExtra)
        } else {
            $(this).parent().parent().find(".hidden").slideUp()
            var checkoutWithExtra = (total * 1.14).toFixed(0)
            $(".CartTotalAndCheckout .total").text(checkoutWithExtra)
        }
    });

    // implimenting coupon application keywords is ---- couponWin ---- use to test the functionality  of this 
    // default value is false because the coupon hasnt been applied yet
    // when coupon already applied a 30% discounts
    var alreadyAppliedCoupon = false
    $("dialog .coupon button").click(function() {
        if ($(this).prev().val() == "couponWin" && !alreadyAppliedCoupon) {
            alreadyAppliedCoupon = true
            total *= 0.70
            var checkoutWithExtra = total * 1.14
            if ($("dialog .options > label input#delivery").is(":checked"))
                checkoutWithExtra *= 1.03
            $(".CartTotalAndCheckout .total").text(checkoutWithExtra.toFixed(0))
        }
    })
}

$(".ConfirmOrder").click(function() {
    alert('Your refrence number is: ' + (Math.floor((Math.random() * 10000000000) + 7)));
})