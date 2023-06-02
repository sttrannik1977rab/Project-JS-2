Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: [],
            imgProduct: 'https://placehold.it/200x150'
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },

    template:
        `<div class="products">
                <product v-for="item of filtered" 
                :key="item.id_product" 
                :img="imgProduct"
                :product="item"
                @add-product="$parent.$refs.basket.addProduct></product>
               </div>`
});

Vue.component('product', {
    props: ['product', 'img'],
    template:
        `<div class="product-item">
            <img :src="img" alt="No image!">
            <h3 class="product-item-name">{{product.product_name}}</h3>
            <p class="product-item-price">{{product.price}}руб</p>
            <button class="product-button-basket" @click="$emit('add-product', product)">купить</button>
        </div>`
})