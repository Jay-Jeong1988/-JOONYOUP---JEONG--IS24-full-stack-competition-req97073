<template>
  <div class="landingPage">
    <ProductsTable/>
  </div>
</template>

<script>
import ProductsTable from '../components/ProductsTable'
export default {
  name: "LandingPage",
  data() {
    return {
    };
  },
  components: {
    ProductsTable
  },
  methods: {
  },
  created(){
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
