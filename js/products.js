let ourProducts = document.getElementById("our_products");
let spinner = document.getElementById("spinner");
let modalBox = document.getElementById("modal_box");
let allFetchedProducts = [];


async function loadProduct() {
    spinner.classList.remove("hidden");
    await fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => {
            allFetchedProducts = data;
            displayProducts(data);
            spinner.classList.add("hidden");
            // setTimeout(() => {
            // }, 3000);
        })
}
loadProduct()

const displayProducts = (allProducts) => {
    ourProducts.innerHTML = "";
    allProducts.map(product => {
        let cardDiv = document.createElement("div");
        // let productName = document.createElement("p");
        // let productImage = document.createElement("img");
        // productImage.src = product.image;
        // productName.innerText = product.title;
        // cardDiv.append(productImage);
        // cardDiv.append(productName);
        // console.log(cardDiv);
        // trendingProduct.append(cardDiv);
        const shortTitle = product.title.length > 30 ? product.title.substring(0, 30) + "..." : product.title;
        cardDiv.classList.add("flex", "flex-col", "bg-white", "rounded", "shadow", "w-75");
        cardDiv.innerHTML = `
            <div class="bg-[#E5E7EB] p-5 rounded-t-sm flex justify-center items-center h-48">
                <img src=${product.image}
                    alt="" class="h-full object-contain">
            </div>
            <div class="p-2 space-y-5 flex flex-col h-full">
                
                <div class="flex flex-col flex-grow space-y-3">
                    <div class="flex justify-between items-center">
                    <div class="bg-blue-200 p-2 rounded-3xl">
                        <p class="font-thin text-sm text-purple-800">${product.category}</p>
                    </div>
                    <p><i class="fa-solid fa-star text-yellow-400"></i><span class="text-thin text-gray-400">${product.rating.rate}(${product.rating.count})</span></p>
                    </div>
                    <p>${shortTitle}</p>
                    <p class="font-bold">$${product.price}</p>
                </div>


                <div class="flex gap-2">
                    <button class="btn btn-outline-white shadow flex-grow px-5 py-1" onclick="openDetailsModal(${product.id})"><i class="fa-regular fa-eye"></i> Details</button>
                    <button class="btn btn-primary shadow flex-grow" onClick="handleAddToCart(${product.id})"><i class="fa-solid fa-cart-shopping"></i> Add</button>
                </div>
            </div>
        `
        // modalBox.innerHTML = `
        // <h3 class="text-lg font-bold">${product.title}</h3>
        //     <p class="py-4 text-justify">${product.description}</p>
        //     <div class="flex justify-between">
        //         <p class="py-2">Price: <span class="font-bold">$${product.price}</span></p>
        //         <p class="py-2">Rating: <i class="fa-solid fa-star text-yellow-400"></i> ${product.rating.rate}</p>
        //     </div>
        //     <div class="mt-5">
        //         <button class="btn btn-info text-white">Buy Now</button>
        //         <button class="btn btn-warning text-white" onClick="handleAddToCart(${product.id})">Add to Cart</button>
        //     </div>
        //     <div class="modal-action">
        //         <form method="dialog">
        //             <!-- if there is a button in form, it will close the modal -->
        //             <button class="btn">Close</button>
        //         </form>
        //     </div>

        // `
        ourProducts.append(cardDiv);
    });
}



let categoryesDiv = document.getElementById("categories_tab");
async function loadCategories() {

    let allBtn = document.createElement("button");
    allBtn.classList.add("btn");
    allBtn.id = "all";
    allBtn.innerText = "All";
    categoryesDiv.append(allBtn);
    await fetch("https://fakestoreapi.com/products/categories")
        .then(res => res.json())
        .then(data => {
            data.map(cat => {
                let button = document.createElement("button");
                button.classList.add("btn");
                button.id = cat;
                button.innerText = cat;
                categoryesDiv.append("")
                categoryesDiv.append(button);
                button.addEventListener("click", () => {
                    loadCategoryProduct(cat);
                })
            });
        });
}
loadCategories();

let allProductButton = document.getElementById("all");
allProductButton.addEventListener("click", () => {
    ourProducts.innerHTML = "";
    loadProduct();
})

const loadCategoryProduct = async (category) => {
    spinner.classList.remove("hidden");
    ourProducts.innerHTML = "";
    const randomDelay = Math.floor(Math.random() * 2000) + 1000;
    // console.log(randomDelay);
    await fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then(res => res.json())
        .then(data => {
            spinner.classList.add("hidden");
            allFetchedProducts = data;
            displayProducts(data);
            // setTimeout(()=>{
            //     },randomDelay);
        })
}


const openDetailsModal = (productId) => {
    const product = allFetchedProducts.find(p => p.id === productId);
    if (!product) return;

    modalBox.innerHTML = `
        <h3 class="text-lg font-bold">${product.title}</h3>
        <p class="py-4 text-justify">${product.description}</p>
        <div class="flex justify-between">
            <p class="py-2">Price: <span class="font-bold">$${product.price}</span></p>
            <p class="py-2">Rating: <i class="fa-solid fa-star text-yellow-400"></i> ${product.rating.rate}</p>
        </div>
        <div class="mt-5">
            <button class="btn btn-info text-white">Buy Now</button>
            <button class="btn btn-warning text-white" onClick="handleAddToCart(${product.id}); my_modal_1.close()">Add to Cart</button>
        </div>
        <div class="modal-action">
            <form method="dialog">
                <button class="btn">Close</button>
            </form>
        </div>
    `;
    my_modal_1.showModal();
}


let cartNumber = document.getElementById("cartNumber");
let cartItems = parseInt(localStorage.getItem("CartItems")) || 0;

let storedIds = localStorage.getItem("CartProductsIDs");
let cartProductsIDList = storedIds ? storedIds.split(",") : [];
// localStorage.setItem("CartItems",cartItems);
const handleAddToCart = (id) => {

    cartItems += 1;
    localStorage.setItem("CartItems", cartItems);
    cartNumber.innerText = cartItems;

    cartProductsIDList.push(id);
    localStorage.setItem("CartProductsIDs", cartProductsIDList.join(","));
    loadCartProductsList();
}
cartNumber.innerText = cartItems;


let drawerUl = document.getElementById("drawer-items");







const loadCartProductsList = async () => {
    drawerUl.innerHTML = "";
    let count = 0;
    let cartPrices = parseInt(localStorage.getItem("TotalCartPrice"))||0;
    const cartProductsID = localStorage.getItem("CartProductsIDs");
    const idsArray = cartProductsID ? cartProductsID.split(",").map(Number) : [];
    
    // fetch products
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();
    let hr = document.createElement("hr");
    hr.classList.add("h-2", "w-full", "text-blue-500");
    let totalCartPrice = document.createElement("div");
    totalCartPrice.classList.add("flex","justify-between");
    // filtered Product
    idsArray.forEach(id => {
        const product = products.find(p => p.id === id);

        if (product) {
            let drawerContentLi = document.createElement("li");
            count += 1;
            cartPrices+=product.price;
            drawerContentLi.innerHTML = `
                <div class="flex">
                    <div><span class="font-bold">${count}.</span>  ${product.title}</div>
                    <div>$${product.price}</div>
                </div>
            `;
            drawerUl.append(drawerContentLi);
        }
        drawerUl.append(hr);
        totalCartPrice.innerHTML=`
            <p>Total Cost:</p>
            <p>${cartPrices}</P>
        `
        drawerUl.append(totalCartPrice);
    });
}


loadCartProductsList();

{/* <li><a>Sidebar Item 1</a></li>
<li><a>Sidebar Item 2</a></li> */}