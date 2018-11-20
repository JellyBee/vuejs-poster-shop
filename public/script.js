var PRICE = 9.99;

new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [
            { id: 1, title: 'Item 1' },
            { id: 2, title: 'Item 2' },
            { id: 3, title: 'Item 3' }
        ],
        cart: [],
        search: ''
    },
    methods: {
        onSubmit: function() {
            console.log("Search for: " + this.search);
            console.log(this.$http);
        },
        addItem: function(index) {
            this.total += PRICE;
            // copy item so we can add some special attributes to it
            var item = this.items[index];
            var found = false;

            // check if this item is already in the cart
            for (var i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id === item.id) {
                    this.cart[i].quantity++;
                    found = true;
                    break;
                }
            }

            //if item not already exists in cart add item with index to cart array
            if (!found) {
                this.cart.push({
                    id: item.id,
                    title: item.title,
                    price: PRICE,
                    quantity: 1
                });
            }
        },
        increment: function(item) {
            item.quantity++;
            this.total += PRICE;
        },
        decrement: function(item) {
            item.quantity--;
            this.total -= PRICE;

            //if item quantity is 0 or lower, remove from cart
            if (item.quantity <= 0) {
                for (var i = 0; i < this.cart.length; i++) {
                    if (this.cart[i].id === item.id) {
                        this.cart.splice(i, 1);
                        break;
                    }
                }
            }
        }
    },
    filters: {
        currency: function(price) {
            return '€'.concat(price.toFixed(2));
        }
    }
});