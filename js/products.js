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
    allBtn.classList.add("btn", "active");
    allBtn.id = "all";
    allBtn.innerText = "All";
    categoryesDiv.append(allBtn);

    allBtn.addEventListener("click", () => {
        ourProducts.innerHTML = "";
        loadProduct();
        updateActiveButton(allBtn); 
    });

    try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        const data = await res.json();

        data.forEach(cat => {
            let button = document.createElement("button");
            button.classList.add("btn");
            button.id = cat;
            button.innerText = cat;
            categoryesDiv.append(button);

            button.addEventListener("click", () => {
                loadCategoryProduct(cat);
                updateActiveButton(button); 
            });
        });
    } catch (error) {
        console.error("Failed to load categories:", error);
    }
}

const updateActiveButton = (clickedButton) => {
    const allCategoryButtons = categoryesDiv.querySelectorAll("button");

    allCategoryButtons.forEach(btn => btn.classList.remove("active"));
    clickedButton.classList.add("active");
}

loadCategories();



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






let cartTbody = document.getElementById("cart-tbody");
let cartTotalPriceEl = document.getElementById("cart-total-price");


const loadCartProductsList = async () => {
    cartTbody.innerHTML = "";

    let count = 0;
    let currentTotal = 0;

    const cartProductsID = localStorage.getItem("CartProductsIDs");
    const idsArray = cartProductsID ? cartProductsID.split(",").map(Number) : [];

    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();

    idsArray.forEach(id => {
        const product = products.find(p => p.id === id);

        if (product) {
            count += 1;
            currentTotal += product.price;


            const shortTitle = product.title.length > 15 ? product.title.substring(0, 15) + "..." : product.title;

            let tr = document.createElement("tr");
            tr.innerHTML = `
                <th>${count}</th>
                <td class="text-sm"">${shortTitle}</td>
                <td class="font-semibold">$${product.price.toFixed(2)}</td>
                <td><button class="btn btn-error btn-xs text-white" onClick="handleDeleteCartItem(${product.id})"><i class="fa-solid fa-trash"></i></button></td>
            `;
            cartTbody.append(tr);
        }
    });
    cartTotalPriceEl.innerText = `$${currentTotal.toFixed(2)}`;
}


loadCartProductsList();


const handleDeleteCartItem = (id) => {
    const cartProductsID = localStorage.getItem("CartProductsIDs");
    const cartItemsNumber = localStorage.getItem("CartItems");
    let cartItems = parseInt(cartItemsNumber);
    cartItems -= 1;
    const idsArray = cartProductsID ? cartProductsID.split(",").map(Number) : [];
    idsArray.pop(id);
    localStorage.setItem("CartProductsIDs", idsArray);
    localStorage.setItem("CartItems", cartItems);
    loadCartProductsList();
}