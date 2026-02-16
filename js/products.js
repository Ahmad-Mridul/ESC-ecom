let ourProducts = document.getElementById("our_products");
let spinner = document.getElementById("spinner");
// let allProducts = [];
async function loadProduct() {
    spinner.classList.remove("hidden");
    await fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => {
            allProducts = data;
            setTimeout(() => {
                displayProducts(data);
                spinner.classList.add("hidden");
            }, 3000);
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
                    <button class="btn btn-outline-white shadow flex-grow px-5 py-1"><i class="fa-regular fa-eye"></i> Details</button>
                    <button class="btn btn-primary shadow flex-grow"><i class="fa-solid fa-cart-shopping"></i> Add</button>
                </div>
            </div>
        `
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
    console.log(randomDelay);
    await fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then(res => res.json())
    .then(data => {
        setTimeout(()=>{
            spinner.classList.add("hidden");
            displayProducts(data);
            },randomDelay);
        })
}


