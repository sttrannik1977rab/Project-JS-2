Vue.component('basket', {
    data() {
        return {
            basketUrl: '/getBasket.json',
            basketItems: [],
            imgBasket: 'https://placehold.it/50x100',
            showBasket: false
        }
    },
    mounted() {
        this.$parent.getJson(`/api/basket`)
            .then(data => {
                for (let item of data.contents) {
                    this.$data.basketItems.push(item);
                }
            });
    },
    methods: {
        addProduct(item) {
            let find = this.basketItems.find(el => el.id_product === item.id_product);
            if (find) {
                this.$parent.putJson(`/api/basket/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({ quantity: 1 }, item);
                this.$parent.postJson(`/api/basket`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.basketItems.push(prod)
                        }
                    })
            }

            // this.$parent.getJson(`${API}/addToBasket.json`)
            //     .then(data => {
            //         if(data.result === 1){
            //             let find = this.cartItems.find(el => el.id_product === item.id_product);
            //             if(find){
            //                 find.quantity++;
            //             } else {
            //                 const prod = Object.assign({quantity: 1}, item);
            //                 this.cartItems.push(prod)
            //             }
            //         }
            //     })
        },
        remove(item) {
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.basketItems.splice(this.basketItems.indexOf(item), 1);
                        }
                    }
                })
        },
    },

    template:
        `<div>
    <button class="basket-button" type="button" @click="showBasket = !showBasket">Корзина</button>
            <div class="basket-menu" v-show="showBasket">
                <basket-menu-id v-for="item of basketItems" :key="item.id_product" :img="imgBasket" :basket-menu-id="item" @remove="remove">
                </basket-menu-id>
            </div>
            </div>
        `
});

Vue.component('basket-menu-id', {
    props: ['img', 'basketItem'],
    template: `
        <div class="basket-menu-id">
            <div class="basket-menu-cart">
                <img class="picture" :scr="img" alt="No image">
                <div class="basket-menu-left-info">
                    <div class="basket-menu-item">{{ basketItem.product_name }}</div>
                    <div class="basket-menu-quantity">Количество: {{ basketItem.quantity }} штук</div>
                    <div class="basket-menu-price"> {{ basketItem.price }} руб</div>
                </div>
            </div>
            <div class="basket-menu-right">
                <div class="basket-menu-right-total">{{basketItem.quantity*basketItem.price}} руб</div>
                <button class="basket-menu-right-bdel" @click="$emit('remove', basketItem)">&times;</button>
            </div>
        </div>
        `

});