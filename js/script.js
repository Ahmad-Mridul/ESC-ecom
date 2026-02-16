let trendingProduct = document.getElementById("trending_product");
let spinner = document.getElementById("spinner");
let modalBox = document.getElementById("modal_box");
let allProducts = [];



async function loadProduct() {
    spinner.classList.remove("hidden");
    await fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => {
            allProducts = data;
            console.log("all products: ", allProducts);
            setTimeout(()=>{
                displayProducts(data);
                spinner.classList.add("hidden");
            },3000,);
        })
}
loadProduct()

const displayProducts = (allProducts) => {
    allProducts.slice(0, 3).map(product => {
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
                    <button class="btn btn-outline-white shadow flex-grow px-5 py-1" onclick="my_modal_1.showModal()"><i class="fa-regular fa-eye"></i> Details</button>
                    <button class="btn btn-primary shadow flex-grow"><i class="fa-solid fa-cart-shopping"></i> Add</button>
                </div>
            </div>
            
        `
        modalBox.innerHTML = `
        <h3 class="text-lg font-bold">${product.title}</h3>
            <p class="py-4 text-justify">${product.description}</p>
            <div class="flex justify-between">
                <p class="py-2">Price: <span class="font-bold">$${product.price}</span></p>
                <p class="py-2">Rating: <i class="fa-solid fa-star text-yellow-400"></i> ${product.rating.rate}</p>
            </div>
            <div class="mt-5">
                <button class="btn btn-info text-white">Buy Now</button>
                <button class="btn btn-warning text-white">Add to Cart</button>
            </div>
            <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn">Close</button>
                </form>
            </div>
        
        `
        trendingProduct.append(cardDiv);
    });
}

