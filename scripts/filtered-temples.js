const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation_modern');


let year = document.querySelector("#year");
let today = new Date();

let lastModified = document.querySelector("#lastModified");
let oLastModif = new Date(document.lastModified);


year.innerHTML = `<span class="footer">${today.getFullYear()}</span>`;
lastModified.innerHTML = `Last modified: ${oLastModif.toLocaleDateString()}`;


hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});


const temples = [
	{
	  templeName: "Aba Nigeria",
	  location: "Aba, Nigeria",
	  dedicated: "2005, August, 7",
	  area: 11500,
	  imageUrl:
	  "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
	},
	{
	  templeName: "Manti Utah",
	  location: "Manti, Utah, United States",
	  dedicated: "1888, May, 21",
	  area: 74792,
	  imageUrl:
	  "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
	},
	{
	  templeName: "Payson Utah",
	  location: "Payson, Utah, United States",
	  dedicated: "2015, June, 7",
	  area: 96630,
	  imageUrl:
	  "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
	},
	{
	  templeName: "Yigo Guam",
	  location: "Yigo, Guam",
	  dedicated: "2020, May, 2",
	  area: 6861,
	  imageUrl:
	  "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
	},
	{
	  templeName: "Washington D.C.",
	  location: "Kensington, Maryland, United States",
	  dedicated: "1974, November, 19",
	  area: 156558,
	  imageUrl:
	  "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
	},
	{
	  templeName: "Lima Perú",
	  location: "Lima, Perú",
	  dedicated: "1986, January, 10",
	  area: 9600,
	  imageUrl:
	  "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
	},
	{
	  templeName: "Mexico City Mexico",
	  location: "Mexico City, Mexico",
	  dedicated: "1983, December, 2",
	  area: 116642,
	  imageUrl:
	  "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
	},
	{
	templeName: "Denver Colorado",
	location: "Centennial, Colorado, United Staes",
	dedicated: "1986, October, 24",
	area: 29117,
	imageUrl:
	"https://churchofjesuschristtemples.org/assets/img/temples/denver-colorado-temple/denver-colorado-temple-42455-main.jpg"
	},
	{
	templeName: "Fukuoka Japan",
	location: "Fukuoka, Japan",
	dedicated: "2000, June, 11",
	area: 10700,
	imageUrl:
	"https://churchofjesuschristtemples.org/assets/img/temples/fukuoka-japan-temple/fukuoka-japan-temple-14618-main.jpg"
	},
	{
	templeName: "Freiberg Germany",
	location: "Freiberg, Germany",
	dedicated: "1985, June, 30",
	area: 21500,
	imageUrl:
	"https://churchofjesuschristtemples.org/assets/img/temples/freiberg-germany-temple/freiberg-germany-temple-16459-main.jpg"
	}
  ];
createTempleCards(temples);

const allTemples = document.querySelector("#home");
const oldTemples = document.querySelector("#old");
const newTemples = document.querySelector("#new");
const largeTemples = document.querySelector("#large");
const smallTemples = document.querySelector("#small");


allTemples.addEventListener("click", () => createTempleCards(temples));

oldTemples.addEventListener("click", () => {
  createTempleCards(temples.filter(temple => new Date(temple.dedicated).getFullYear() < 1900));
});

newTemples.addEventListener("click", () => {
  createTempleCards(temples.filter(temple => new Date(temple.dedicated).getFullYear() > 2000));
});

largeTemples.addEventListener("click", () => {
  createTempleCards(temples.filter(temple => temple.area > 90000));
});

smallTemples.addEventListener("click", () => {
  createTempleCards(temples.filter(temple => temple.area < 10000));
});




function createTempleCards(filteredTemples) {
	const container = document.querySelector(".res-grid");
	container.innerHTML = ""; // Clear the container first
  
	filteredTemples.forEach(temple => {
	  let card = document.createElement("section");
	  let name = document.createElement("h3");
	  let location = document.createElement("p");
	  let dedicated = document.createElement("p");
	  let area = document.createElement("p");
	  let image = document.createElement("img");
  
	  name.textContent = temple.templeName;
	  location.innerHTML = `<span class="label">Location: </span>${temple.location}`;
	  dedicated.innerHTML = `<span class="label">Dedicated: </span>${temple.dedicated}`;
	  area.innerHTML = `<span class="label">Size: </span>${temple.area} sq ft`;
	  image.setAttribute("src", temple.imageUrl);
	  image.setAttribute("alt", `${temple.templeName} Temple`);
	  image.setAttribute("loading", "lazy");
  
	  card.appendChild(name);
	  card.appendChild(location);
	  card.appendChild(dedicated);
	  card.appendChild(area);
	  card.appendChild(image);
  
	  container.appendChild(card);
	});
  }
  
  // Initialize by displaying all temples
  createTempleCards(temples);


