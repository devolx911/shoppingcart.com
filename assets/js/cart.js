// selectors 
const cartSummary = document.querySelector(".cart-summary")
const item = document.querySelector(".items")
const cartIcon = document.getElementById("cart-amount");
const checkoutContainer = document.getElementById("checkout-container");
const closeCheckout = document.getElementById("close-checkout");


let basket = JSON.parse(localStorage.getItem("data")) || [];


// generate cart on the web page 
const generateCart = ()=>{  
    if(basket.length !== 0){
        return (item.innerHTML = basket.map((x)=>{
            let {id,item}=x;
            let search = shopItems.find((y)=>y.id === id) || []
            return `
                    <div class="product">
                        <img width=100 src=${search.img} alt="">
                        <div class="product-details">
                            <div class="title-price">
                                <p>${search.brand}</p>
                                <h3>${search.price}</h3>
                                <i onclick="removeProduct(${id})" class="fa fa-times"></i>
                            </div>
                            <div class="quantity-btn">
                                <button onclick="decrease(${id})"><i class="fa fa-minus"></i></button>
                                <span id=${id}>${item}</span>
                                <button onclick="increase(${id})"><i class="fa fa-plus"></i></button>
                            </div>
                            <h2>$ ${search.price * item}</h2>
                        </div>
                    </div>
                    `
        }).join(""))
    }else{
        item.innerHTML = ``
        cartSummary.innerHTML =`
                <h2>Cart is Empty</h2>
                <a href="shopping-cart.html">Back to Home</a>
            `
    }

}
generateCart()

/* retrive  the total number of the 
    selected item form localstorage and display in
    the cart icon
*/ 
const totalCart = ()=>{
    let total = basket.map((x)=> x.item).reduce((x,y)=>x+y,0)
    cartIcon.textContent = total;
}

/* add event listener to increase decrease
 the quantity of a particular product
*/
const increase = (id)=>{
    const selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem.id);

    if(search === undefined){
        basket.push({
            id: selectedItem.id,
            item: 1
        })
    }else{
        search.item ++;
    }
    generateCart()
    update(selectedItem.id) 
    localStorage.setItem("data", JSON.stringify(basket));
}
const decrease = (id)=>{
    const selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem.id);

    if(search === undefined)return
    if(search.item === 0)return
    else{
        search.item --;
    }
    update(selectedItem.id) 
    basket = basket.filter((x)=> x.item !==0)
    generateCart()
    localStorage.setItem("data", JSON.stringify(basket));
}

/* update the quantity of the item been which 
    the increase on decrease function is been 
    run on
*/
const update = (id)=>{
    let search = basket.find((x)=>x.id === id)
    document.getElementById(id).textContent = search.item;
    totalCart()
    totalAmount()
}
const removeProduct = (id)=>{
    let selectedItem = id;
    basket = basket.filter((x)=> x.id !== selectedItem.id)
    generateCart()
    totalCart()
    totalAmount()
    localStorage.setItem("data", JSON.stringify(basket));
}
let totalAmount = ()=>{
    if(basket.length !==0){
        let amount = basket.map((x)=>{
            let {id,item} = x;
            let search = shopItems.find((y)=>y.id === id) || []
            return  item * search.price;
        }).reduce((x,y)=>x+y,0)
        cartSummary.innerHTML = `
            <h2>Total Bill: $${amount} </h2> 
            <div>
                <button onclick="openCheckOut()" class="checkout btn">Checkout</button>
                <button onclick="clearCart()" class="remove-all btn">Clear Cart</button>
            </div>   
        `
        console.log(amount);
    }else return
    
}
let clearCart = ()=>{
    basket = []
    generateCart()
    totalCart()
    localStorage.setItem("data", JSON.stringify(basket));
}
let openCheckOut = ()=>{
    checkoutContainer.classList.add("active")
}
closeCheckout.addEventListener("click", function(){
    checkoutContainer.classList.remove("active")
})

totalAmount()
totalCart()