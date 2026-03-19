const container = document.getElementById("pokemon-container");
const cartItems = document.getElementById("cart-items");
const totalEl = document.getElementById("total");

let cart = [];
let allPokemons = [];

function getPrice(id) {
    return id * 5 + Math.floor(Math.random() * 100);
}

async function loadPokemons() {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025");
    const data = await res.json();

    allPokemons = data.results.map((p, index) => ({
        name: p.name,
        id: index + 1,
        price: getPrice(index + 1),
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
    }));

    renderPokemons(allPokemons);
}

function renderPokemons(list) {
    container.innerHTML = "";

    list.forEach(pokemon => {
        const card = document.createElement("div");
        card.className = "pokemon-card";

        card.innerHTML = `
            <h3>${pokemon.name.toUpperCase()}</h3>
            <img src="${pokemon.image}">
            <p>💰 ${pokemon.price} บาท</p>
            <button onclick="addToCart('${pokemon.name}', ${pokemon.price})">
                ซื้อ
            </button>
        `;

        container.appendChild(card);
    });
}

function searchPokemon() {
    const keyword = document.getElementById("search").value.toLowerCase();
    const filtered = allPokemons.filter(p =>
        p.name.toLowerCase().includes(keyword)
    );
    renderPokemons(filtered);
}

function addToCart(name, price) {
    cart.push({ name, price });
    renderCart();
}

function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price;
        const div = document.createElement("div");
        div.innerText = `${item.name} - ${item.price} บาท`;
        cartItems.appendChild(div);
    });

    totalEl.innerText = `รวม: ${total} บาท`;
}

function checkout() {
    if (cart.length === 0) {
        alert("ตะกร้าว่าง!");
        return;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "receipt.html";
}

loadPokemons();