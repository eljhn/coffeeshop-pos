const { createApp } = Vue;
    createApp({
      data() {
        return {
          cart: JSON.parse(localStorage.getItem("cart") || "[]"),
        };
      },
      computed: {
        total() {
          return this.cart.reduce((sum, item) => sum + item.subtotal, 0);
        },
        receiptNo() {
          return "R-" + Date.now();
        }
      },
      mounted() {
        // Auto print receipt and go back to index.html
        window.print();
        window.onafterprint = () => {
          localStorage.removeItem("cart"); // clear cart after print
          window.location.href = "index.html";
        };
      }
    }).mount("#app");