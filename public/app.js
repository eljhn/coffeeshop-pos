const { createApp } = Vue;

createApp({
  data() {
    return {
      categories: [
        { name: "Coffee", img: "pictures/coffee_category/americano_coffee.jpg" },
        { name: "Milk Tea", img: "pictures/milktea_category/chocolate_milktea.jpg" },
        { name: "Frappe", img: "pictures/frappe_category/coffeebased_capuccino_frappe.jpg" },
        { name: "Desserts", img: "pictures/desserts_category/cakes_chocolate.webp" },
        { name: "Add-ons", img: "pictures/addons_pictures/tapiocapearls_addons.jpg" }
      ],
      selectedCategory: "Coffee",
      products: { 
        Coffee: [
          { name: "Americano coffee", img: "pictures/coffee_category/americano_coffee.jpg", sizes: { Medium: 99, Large: 120 }, selectedSize: null, option: null, qty: 1 },
          { name: "Cappuccino coffee", img: "pictures/coffee_category/cappuccino_coffee.jpg", sizes: { Medium: 99, Large: 120 }, selectedSize: null, option: null, qty: 1 },
          { name: "Espresso coffee", img: "pictures/coffee_category/espresso_coffee.jpg", sizes: { Medium: 99, Large: 120 }, selectedSize: null, option: null, qty: 1 },
          { name: "Macchiato coffee", img: "pictures/coffee_category/macchiato_coffee.jpg", sizes: { Medium: 99, Large: 120 }, selectedSize: null, option: null, qty: 1 },
          { name: "Vanilla latte coffee", img: "pictures/coffee_category/vanillalatte_coffee.jpg", sizes: { Medium: 99, Large: 120 }, selectedSize: null, option: null, qty: 1 }
        ],
        "Milk Tea": [
          { name: "Chocolate milk tea", img: "pictures/milktea_category/chocolate_milktea.jpg", sizes: { Medium: 99, Large: 120 }, selectedSize: null, qty: 1 },
          { name: "Cookies and cream milk tea", img: "pictures/milktea_category/cookiesandcream_milktea.jpg", sizes: { Medium: 99, Large: 120 }, selectedSize: null, qty: 1 },
          { name: "Dark choco milktea", img: "pictures/milktea_category/darkchoco_milktea.jpg", sizes: { Medium: 99, Large: 120 }, selectedSize: null, qty: 1 },
          { name: "Matcha milk tea", img: "pictures/milktea_category/matcha_milktea.jpg", sizes: { Medium: 99, Large: 120 }, selectedSize: null, qty: 1 },
          { name: "Red velvet milk tea", img: "pictures/milktea_category/redvelvet_milktea.jpg", sizes: { Medium: 99, Large: 120 }, selectedSize: null, qty: 1 },
          { name: "Strawberry milk tea", img: "pictures/milktea_category/strawberry_milktea.jpg", sizes: { Medium: 99, Large: 120 }, selectedSize: null, qty: 1 },
          { name: "Winter melon milk tea", img: "pictures/milktea_category/wintermelon_milktea.jpg", sizes: { Medium: 99, Large: 120 }, selectedSize: null, qty: 1 }
        ],
        Frappe: [
          { name: "Capuccino frappe", img: "pictures/frappe_category/coffeebased_capuccino_frappe.jpg", sizes: { Medium: 99, Large: 120 }, selectedSize: null, qty: 1 },
          { name: "Caramel frappe", img: "pictures/frappe_category/coffeebased_caramel_frappe.jpg", sizes: { Medium: 99, Large: 120 }, selectedSize: null, qty: 1 },
          { name: "Mocha frappe", img: "pictures/frappe_category/coffeebased_mocha_frappe.jpg", sizes: { Medium: 99, Large: 120 }, selectedSize: null, qty: 1 },
          { name: "Vanilla frappe", img: "pictures/frappe_category/coffeebased_vanilla_frappe.jpg", sizes: { Medium: 99, Large: 120 }, selectedSize: null, qty: 1 },
          { name: "Mango frappe", img: "pictures/frappe_category/fruity_mango_frappe.jpg", sizes: { Medium: 99, Large: 120 }, selectedSize: null, qty: 1 },
          { name: "Strawberry frappe", img: "pictures/frappe_category/fruity_strawberry_frappe.jpg", sizes: { Medium: 99, Large: 120 }, selectedSize: null, qty: 1 }
        ],
        Desserts: [
          { name: "Banana bread", img: "pictures/desserts_category/bread_bananabread.webp", price: 120, qty: 1 },
          { name: "Almond croissant", img: "pictures/desserts_category/bread_croissant_almond.jpg", price: 120, qty: 1 },
          { name: "Butter Croissant", img: "pictures/desserts_category/bread_croissant_butter.webp", price: 120, qty: 1 },
          { name: "Chocolate Croissant", img: "pictures/desserts_category/bread_croissant_chocolate.jpg", price: 120, qty: 1 },
          { name: "Cinnamon rolls", img: "pictures/desserts_category/bread_cinnamon.jpg", price: 120, qty: 1 },
          { name: "Mocha cake", img: "pictures/desserts_category/cakes_mocha.jpg", price: 140, qty: 1 },
          { name: "Oreo Cheese cake", img: "pictures/desserts_category/cakes_oreocheesecake.webp", price: 140, qty: 1 },
          { name: "Red velvet cake", img: "pictures/desserts_category/cakes_redvelvet.jpg", price: 140, qty: 1 },
          { name: "Ube macapuno", img: "pictures/desserts_category/cakes_ubemacapuno.jpg", price: 140, qty: 1 },
          { name: "Chocolate cake", img: "pictures/desserts_category/cakes_chocolate.webp", price: 140, qty: 1 }
        ],
        "Add-ons": [
          { name: "Tapioca pearls", img: "pictures/addons_pictures/tapiocapearls_addons.jpg", price: 20, qty: 1 },
          { name: "Nata de coco", img: "pictures/addons_pictures/natadecoco_addons.jpg", price: 20, qty: 1 }
        ]
      },
      // for showing a temporary notice
      cart: JSON.parse(localStorage.getItem("cart") || "[]"), 
      notice: "" 
    }
  },
  computed: {
    total() {
      return this.cart.reduce((sum, item) => sum + item.subtotal, 0);
    },
    receiptNo() {
      return "R-" + Date.now();
    }
  },
  watch: {
    cart: {
      handler(newCart) {
        localStorage.setItem("cart", JSON.stringify(newCart));
      },
      deep: true
    }
  },
  methods: {
  isSelectable(prod) {
    if (prod.sizes && !prod.selectedSize) return false;
    if (this.selectedCategory === "Coffee" && !prod.option) return false;
    return true;
  },
  addToCart(prod) {
    let price = prod.sizes ? prod.sizes[prod.selectedSize] : prod.price;
    let item = {
      name: prod.name,
      size: prod.selectedSize || null,
      option: prod.option || null,
      qty: prod.qty,
      subtotal: price * prod.qty
    };
    this.cart.push(item); 
    this.showNotice(`${prod.name} added to cart!`);
  },
  removeItem(index) {
    let removed = this.cart[index].name;
    this.cart.splice(index, 1);
    this.showNotice(`${removed} removed from cart.`);
  },
  cancelCart() {
    if (this.cart.length > 0) {
      this.cart = [];
      this.showNotice("Order has been canceled.");
    }
  },
  showNotice(message) {
    this.notice = message;
    setTimeout(() => {
      this.notice = "";
    }, 2000);
  }
}

}).mount("#app");
