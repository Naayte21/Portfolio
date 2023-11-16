class CartItem {
  constructor(id, url, description, qty, price) {
    this.id = id;
    this.url = url;
    this.description = description;
    this.qty = qty;
    this.price = price;
  }
  increaseQty() {
    if (this.qty >= 10) {
      alert("sorry! Max items is 10");
      return;
    }
    this.qty = this.qty + 1;
  }
  decreaseQty() {
    if (this.qty <= 1) {
      alert("sorry! minimum items is 1");
      return;
    }
    this.qty -= 1;
    //this.qty = this.qty - 1;
  }
}

class Cart {
  constructor() {
    this.cartItems = [];
    this.lastId = 0;
    this.subTotal = 0;
  }
  cacheDom() {
    this.table = document.getElementById("table");
    this.sum = document.getElementById("sum");
  }
  render() {
    this.table.innerHTML = "";
    this.subTotal = 0;
    this.cartItems.forEach((item) => {
      let total = this.getLineTotal(item.qty, item.price);
      this.subTotal += total;

      const tr = document.createElement("tr");

      const tdImg = document.createElement("td");
      const img = document.createElement("img");
      img.src = `/img/${item.url}`;
      tdImg.appendChild(img)
      tr.appendChild(tdImg);

      const tdDesc = document.createElement("td");
      tdDesc.textContent = item.description;
      tr.appendChild(tdDesc);

      const tdQty = document.createElement("td");

      const qtyControl = document.createElement("div");

      const btnDecrease = document.createElement("button");
      btnDecrease.innerHTML = "&minus;";
      btnDecrease.classList.add("btn");

      //   add event listener
      qtyControl.appendChild(btnDecrease);
      btnDecrease.addEventListener("click", () => {
        this.decreaseQty(item.id);
        this.render();
      });

      const qtyVal = document.createElement("span");
      qtyVal.textContent = item.qty;
      qtyControl.appendChild(qtyVal);

      const btnIncrease = document.createElement("button");
      btnIncrease.innerHTML = "&plus;";
      btnIncrease.classList.add("btn");

      btnIncrease.addEventListener("click", () => {
        this.increaseQty(item.id);
        this.render();
      });
      qtyControl.appendChild(btnIncrease);

      tdQty.appendChild(qtyControl);
      tr.appendChild(tdQty);

      const tdPrice = document.createElement("td");
      tdPrice.textContent = `R${item.price}`;
      tr.appendChild(tdPrice);

      const tdTotal = document.createElement("td");
      tdTotal.textContent = `R${total}`;
      tr.appendChild(tdTotal);

      const tdDelete = document.createElement("td");
      const btnDelete = document.createElement("button");
      btnDelete.innerHTML = "&times;";

      btnDelete.addEventListener("click", () => {
        this.removeItem(item.id);
        this.render();
      });

      //   add evet listener
      tdDelete.appendChild(btnDelete);
      tr.appendChild(tdDelete);

      //finally append tr to table
      this.table.appendChild(tr);
    });
    this.sum.textContent = `R${this.subTotal}`;
  }
  addItem(item) {
    this.cartItems.push(item);
  }
  removeItem(id) {
    this.cartItems = this.cartItems.filter((item) => item.id !== id);
  }

  //======   increasing n decreasing Qty=======
  increaseQty(id) {
    this.cartItems.find((item) => item.id === id).increaseQty();
  }
  decreaseQty(id) {
    this.cartItems.find((item) => item.id === id).decreaseQty();
  }

  getLineTotal(qty, price) {
    return qty * price;
  }
  generateId() {
    this.lastId++;
    return this.lastId;
  }
}
//cartItem(url, description, qty, price);

const cart = new Cart();
cart.cacheDom();

cart.addItem(
  new CartItem(cart.generateId(),
   "p1.jpg",
    "sneaker",
     1, 500)
);

cart.addItem(
  new CartItem(cart.generateId(), 
  "p2.jpg",
   "Rich Dad Poor Dad", 2, 550)
);

cart.addItem(
  new CartItem(cart.generateId(), "p3.jpg", "java fandamental", 1, 600)
);

cart.render();
