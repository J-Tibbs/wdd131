let year = document.querySelector("#year");
let today = new Date();

let lastModified = document.querySelector("#lastModified");
let oLastModif = new Date(document.lastModified);

const productSelect = document.getElementById('product');
const products = [
    
    
    {
        id: "fc-1888",
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averagerating: 5.0
    }
];
//Footer
year.innerHTML = `<span class="footer">${today.getFullYear()}</span>`;
lastModified.innerHTML = `Last modified: ${oLastModif.toLocaleDateString()}`;


products.forEach(product => {
    const option = document.createElement('option');
    option.value = product.name;
    option.textContent = product.name;
    productSelect.appendChild(option);
});

// Load saved product from localStorage if available
window.addEventListener('load', () => {
    const savedProduct = localStorage.getItem('selectedProduct');
    if (savedProduct) {
        productSelect.value = savedProduct;
    }
});

// Save selected product to localStorage when changed
productSelect.addEventListener('change', () => {
    localStorage.setItem('selectedProduct', productSelect.value);
});