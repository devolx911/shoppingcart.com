// selectors
const storeContainer = document.querySelector(".items-container");
const cartIcon = document.getElementById("cart-amount");

/*add and remove items  from the basket on a 
    click of the increament and decrement butto
*/
let basket = JSON.parse(localStorage.getItem("data")) || [];





// display store item to the web page
let generateShopItems = ()=>{
    return (storeContainer.innerHTML = shopItems.map((x)=>{
        let {id,brand,desc,img,price} = x;
        let search = basket.find((x)=>x.id == id) || [];
        return`
                <div class="cart-item">
                    <div class="item-image">
                        <img src=${img} alt="">
                    </div>
                    <div class="brand-name">
                        <h2>${brand}</h2>
                    </div>
                    <div class="brand-info">
                        ${desc}
                    </div>
                    <div class="price-quantity-btn">
                        <div class="price-container">
                            <h2>$ ${price}</h2>
                        </div>
                        <div class="quantity-btn">
                            <button onclick="decrease(${id})"><i class="fa fa-minus"></i></button>
                            <span id=${id}>${search.item === undefined? 0 :search.item }</span>
                            <button onclick="increase(${id})"><i class="fa fa-plus"></i></button>
                        </div>
                    </div>
                </div>
            `
    }).join(""))
}

generateShopItems()

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
}

/* calucalte the total number of the 
    selected item and display in
    the cart icon
*/ 
const totalCart = ()=>{
    let total = basket.map((x)=> x.item).reduce((x,y)=>x+y,0)
    cartIcon.textContent = total;
}

totalCart()