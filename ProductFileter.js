    const products = [
      {id:1,name:'MacBook Pro',    category:'tech',       price:999, inStock:true,  emoji:'💻'},
      {id:2,name:'iPhone 15',      category:'tech',       price:799, inStock:true,  emoji:'📱'},
      {id:3,name:'Standing Desk',  category:'furniture',  price:349, inStock:true,  emoji:'🪑'},
      {id:4,name:'Monitor 4K',     category:'tech',       price:449, inStock:false, emoji:'🖥️'},
      {id:5,name:'Ergonomic Chair',category:'furniture',  price:299, inStock:true,  emoji:'🪑'},
      {id:6,name:'Mechanical Keyboard',category:'accessories',price:129,inStock:true,emoji:'⌨️'},
      {id:7,name:'USB-C Hub',      category:'accessories',price:49,  inStock:true,  emoji:'🔌'},
      {id:8,name:'Webcam HD',      category:'accessories',price:89,  inStock:false, emoji:'📷'},
      {id:9,name:'Desk Lamp',      category:'furniture',  price:79,  inStock:true,  emoji:'💡'},
      {id:10,name:'AirPods Pro',   category:'accessories',price:249, inStock:true,  emoji:'🎧'},
];

let currentCategory = "all";
let currentSort = "default"
let maxPrice = 1000;

function getFilteredProducts () {
    return products
    .filter(p => currentCategory === 'all' || p.category === currentCategory).filter(p => p.price <= maxPrice).sort((a,b) => {
        if(currentSort === "price-asc") return a.price - b.price
        if(currentSort === "price-desc") return b.price - a.price
        if(currentSort === "name-asc") return a.name.localeCompare(b.name);
        return a.id - b.id;
    });
}

function renderProducts () {
    const filtered = getFilteredProducts();
    const grid = document.querySelector("#productGrid");
    const noRes = document.querySelector("#noResults");
    const results = document.querySelector("#results");

    grid.innerHTML = "";
    results.textContent = `Showing ${filtered.length} of ${products.length} products`;
    noRes.style.display = filtered.length === 0 ?  "block" : "none";

    filtered.forEach(p => {
        const card = document.createElement("div")
        card.className = "product-card";
        card.innerHTML = `
                  <div class='card-img' style='background:${p.inStock?'#F0FDF4':'#FEF2F2'}'>${p.emoji}</div>
                  <div class="card-body">
                  <span class="card-category">${p.category}</span>
                  <p class="card-name">${p.name}</p>
                  <p class="card-price">${p.price}</p>
                  <p class="card-stock ${p.inStock?'in-stock' : 'out-stock'}">${p.inStock ? '✓ In Stock' : '✗ Out of Stock'}</p>
                  </div>`
                  grid.appendChild(card);
    });
}
document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        currentCategory = btn.dataset.category;
        renderProducts()
    })
})

document.querySelector("#sortSelect").addEventListener("change", e => {
    currentSort = e.target.value;
    renderProducts();
});
document.querySelector("#priceRange").addEventListener("input", e => {
    maxPrice = Number(e.target.value);
    document.querySelector("#priceVal").textContent = maxPrice;
    renderProducts();
});

renderProducts();