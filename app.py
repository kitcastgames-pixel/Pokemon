from flask import Flask, render_template, request

app = Flask(__name__)

pokemons = {
    "Pikachu": {"hp": 35, "damage": 55, "price": 500, "moves": ["Thunder Shock", "Quick Attack", "Iron Tail"], "image": "pikachu.png"},
    "Charmander": {"hp": 39, "damage": 52, "price": 450, "moves": ["Flamethrower", "Scratch", "Ember"], "image": "charmander.png"},
    "Squirtle": {"hp": 44, "damage": 48, "price": 400, "moves": ["Water Gun", "Tackle", "Bubble"], "image": "squirtle.png"},
    "Bulbasaur": {"hp": 45, "damage": 49, "price": 420, "moves": ["Vine Whip", "Tackle", "Razor Leaf"], "image": "bulbasaur.png"}
}

@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "POST":
        name = request.form.get("pokemon")
        quantity = int(request.form.get("quantity", 1))
        move = request.form.get("move")

        # รับค่าที่ผู้ใช้ปรับเอง
        hp = int(request.form.get("hp", pokemons[name]["hp"]))
        damage = int(request.form.get("damage", pokemons[name]["damage"]))

        # ราคาเป็นค่าคงที่
        price = pokemons[name]["price"]
        total = quantity * price

        data = {
            "hp": hp,
            "damage": damage,
            "price": price,
            "image": pokemons[name]["image"]
        }

        return render_template("receipt.html", name=name, quantity=quantity, move=move, total=total, data=data)

    return render_template("index.html", pokemons=pokemons)

if __name__ == "__main__":
    app.run(debug=True)