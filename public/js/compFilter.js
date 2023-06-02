Vue.component('search-filter', {
    data() {
        return {
            userSearch: ''
        }
    },

    template:
        ` <form action="#" class="header-right-form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
        <input type="text" placeholder="телевизор" class="header-right-form-field" v-model="userSearch">
        <button class="header-right-form-button" type="submit">
            <i class="fas fa-search"></i>
        </button>
    </form> `
})