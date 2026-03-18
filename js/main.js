// ข้อมูล Pokémon
const pokemons = {
    "Pikachu": {hp:35, damage:55, price:500, moves:["Thunder Shock","Quick Attack","Iron Tail"], image:"pikachu.png"},
    "Charmander": {hp:39, damage:52, price:450, moves:["Flamethrower","Scratch","Ember"], image:"charmander.png"},
    "Squirtle": {hp:44, damage:48, price:400, moves:["Water Gun","Tackle","Bubble"], image:"squirtle.png"},
    "Bulbasaur": {hp:45, damage:49, price:420, moves:["Vine Whip","Tackle","Razor Leaf"], image:"bulbasaur.png"}
};

// สร้างหน้าเลือก Pokémon
const container = document.getElementById("pokemon-container");

for (let name in pokemons) {
    const p = pokemons[name];
    const card = document.createElement("div");
    card.className = "pokemon-card";

    card.innerHTML = `
        <img src="images/${p.image}" alt="${name}">
        <h3>${name}</h3>
        <label>HP:</label><input type="number" id="${name}-hp" value="${p.hp}" min="1"><br>
        <label>Damage:</label><input type="number" id="${name}-damage" value="${p.damage}" min="1"><br>
        <p>ราคา: ${p.price} บาท</p>
        <label>จำนวน:</label><input type="number" id="${name}-quantity" value="1" min="1"><br>
        <label>ท่าโจมตี:</label>
        <select id="${name}-move">
            ${p.moves.map(m => `<option>${m}</option>`).join("")}
        </select><br>
        <button onclick="buyPokemon('${name}')">ซื้อ ${name}</button>
    `;

    container.appendChild(card);
}

// ฟังก์ชันซื้อ → เปิดใบเสร็จ
function buyPokemon(name){
    const hp = document.getElementById(`${name}-hp`).value;
    const damage = document.getElementById(`${name}-damage`).value;
    const quantity = document.getElementById(`${name}-quantity`).value;
    const move = document.getElementById(`${name}-move`).value;
    const price = pokemons[name].price;
    const total = price * quantity;

    // สร้าง URL ใบเสร็จพร้อม query string
    const params = new URLSearchParams({
        name, hp, damage, quantity, move, total, image:pokemons[name].image
    });
    window.location.href = `receipt.html?${params.toString()}`;
}