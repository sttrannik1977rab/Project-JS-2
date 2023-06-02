Vue.component('error', {
  data() {
    return {
      text: ''
    }
  },
  computed: {
    isVisible() {
      return this.text !== ''
    }
  },
  template: `
    <div class="error-block" v-if="isVisible">
        <p class="error-msg">
        <button class="basket-menu-right-bdel" @click="text=''">&times;</button>
        {{ text }}
</p>
</div>
    `
})