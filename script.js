// PRODUCTS
let products = [
{
 name:"Running Sneaker",
 cat:"shoe",
 price:1200,
 images:[
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  "https://images.unsplash.com/photo-1528701800489-20be3c63a2a0",
  "https://images.unsplash.com/photo-1519741497674-611481863552",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c"
 ]
},
{
 name:"Casual Shirt",
 cat:"shirt",
 price:800,
 images:[
  "https://images.unsplash.com/photo-1521334884684-d80222895322",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
  "https://images.unsplash.com/photo-1520975922284-8b456906c813",
  "https://images.unsplash.com/photo-1516826957135-700dedea698c"
 ]
},
{
 name:"Denim Pant",
 cat:"pant",
 price:1000,
 images:[
  "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
  "https://images.unsplash.com/photo-1473966968600-fa801b869a1a",
  "https://images.unsplash.com/photo-1514996937319-344454492b37"
 ]
},
{
 name:"Premium Watch",
 cat:"watch",
 price:1500,
 images:[
  "https://images.unsplash.com/photo-1511385348-a52b4a160dc2",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  "https://images.unsplash.com/photo-1508057198894-247b23fe5ade",
  "https://images.unsplash.com/photo-1519741497674-611481863552"
 ]
},
{
 name:"Sport Shoe Pro",
 cat:"shoe",
 price:1400,
 images:[
  "https://images.unsplash.com/photo-1528701800489-20be3c63a2a0",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  "https://images.unsplash.com/photo-1519741497674-611481863552",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c"
 ]
}
];

// VARIABLES
let cart = [];
let current = null;

let productsDiv = document.getElementById("products");
let cartItems = document.getElementById("cartItems");
let totalEl = document.getElementById("total");

// LOAD PRODUCTS
function load(list = products){
productsDiv.innerHTML = list.map((p,i)=>`
<div class="card">
<div class="badge">HOT</div>
<img src="${p.images[0]}" onclick="openModal(${i})">
<h4>${p.name}</h4>
<p class="price">৳ ${p.price}</p>
<button class="add-btn" onclick="quickAdd(${i})">Add</button>
</div>
`).join('');
}
load();

// SEARCH
function searchProduct(){
let v = document.getElementById("search").value.toLowerCase();
let filtered = products.filter(p =>
p.name.toLowerCase().includes(v)
);
load(filtered);
}

// CATEGORY FILTER
function filterCat(cat){
if(cat === 'all') load();
else load(products.filter(p => p.cat === cat));
}

// MODAL OPEN
function openModal(i){
let p = products[i];
document.getElementById("modal").style.display = "flex";

document.getElementById("mainImg").src = p.images[0];
document.getElementById("pName").innerText = p.name;
document.getElementById("pPrice").innerText = "৳ " + p.price;

current = p;

// thumbnails
document.getElementById("thumbs").innerHTML =
p.images.map(img =>
`<img src="${img}" onclick="changeImg('${img}')">`
).join('');
}

// CHANGE IMAGE
function changeImg(src){
document.getElementById("mainImg").src = src;
}

// CLOSE MODAL
function closeModal(){
document.getElementById("modal").style.display = "none";
}

// ADD TO CART (from modal)
function addCart(){
let found = cart.find(i => i.name === current.name);

if(found){
found.qty++;
}else{
cart.push({...current, qty:1});
}

updateCart();
closeModal();
}

// QUICK ADD
function quickAdd(i){
let p = products[i];
let found = cart.find(x => x.name === p.name);

if(found){
found.qty++;
}else{
cart.push({...p, qty:1});
}

updateCart();
}

// CHANGE QTY
function changeQty(name,type){
let item = cart.find(i => i.name === name);

if(type === "inc") item.qty++;
if(type === "dec") item.qty--;

if(item.qty <= 0){
cart = cart.filter(i => i.name !== name);
}

updateCart();
}

// UPDATE CART
function updateCart(){
let total = 0;

cartItems.innerHTML = cart.map(i=>{
let sum = i.price * i.qty;
total += sum;

return `
<div style="display:flex;justify-content:space-between;margin:5px 0;">
${i.name}
<div>
<button onclick="changeQty('${i.name}','dec')">-</button>
${i.qty}
<button onclick="changeQty('${i.name}','inc')">+</button>
</div>
</div>
`;
}).join('');

totalEl.innerText = total;
}

// WHATSAPP ORDER
function order(){

let name = document.getElementById("name").value;
let phone = document.getElementById("phone").value;
let gmail = document.getElementById("gmail").value;
let division = document.getElementById("division").value;
let district = document.getElementById("district").value;
let thana = document.getElementById("thana").value;
let union = document.getElementById("union").value;
let village = document.getElementById("village").value;
let size = document.getElementById("size").value;

if(!name || !phone){
alert("Name & Phone required!");
return;
}

if(cart.length === 0){
alert("Cart empty!");
return;
}

let items = cart.map(i =>
`${i.name} x${i.qty} = ৳${i.price*i.qty}`
).join('%0A');

let total = totalEl.innerText;

let msg =
`🛒 MRST Fashion Order from%0A
----------------%0A
${items}%0A
----------------%0A
Total: ৳ ${total}%0A
----------------%0A
Name: ${name}%0A
Phone: ${phone}%0A
Gmail: ${gmail}%0A
Division: ${division}%0A
District: ${district}%0A
Thana: ${thana}%0A
Union: ${union}%0A
Village: ${village}%0A
Size: ${size}`;

window.open(`https://wa.me/8801605019908?text=${msg}`, "_blank");
}


let index = 0;
let slides = document.getElementById("slides");
let total = 4;

setInterval(() => {
  index++;
  if(index >= total) index = 0;
  slides.style.transform = `translateX(-${index * 100}%)`;
}, 3000);