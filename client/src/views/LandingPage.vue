<template>
  <div class="landingPage">
    <p v-for="(product, i) in products" :key="i">{{ product }}</p>
  </div>
</template>

<script>
import api from '../service/api';
export default {
  name: "LandingPage",
  data() {
    return {
      products: []
    };
  },
  methods: {
    retrieveTutorials() {
      api.getAll()
        .then(response => {
          this.products = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
  },
  created(){
    this.retrieveTutorials();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
