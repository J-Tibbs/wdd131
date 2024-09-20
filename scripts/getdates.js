let year = document.querySelector("#year");
let today = new Date();

let lastModified = document.querySelector("#lastModified");
let oLastModif = new Date(document.lastModified);


year.innerHTML = `<span class="footer">${today.getFullYear()}</span>`;
lastModified.innerHTML = `Last modified: ${oLastModif.toLocaleDateString()}`;