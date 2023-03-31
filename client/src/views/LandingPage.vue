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
    handleHashChange() {
      if (!window.location.hash) {
        this.$store.state.productModalShow = false;
      } else if(window.location.hash == this.$store.state.openProductModalHashId) {
        this.$store.state.productModalShow = true;
      } 
      setTimeout(() => {
        this.$bvModal.show(this.$store.state.targetModalId);
      }, 100);
    }
  },
  mounted(){
    this.handleHashChange();
    window.onhashchange = () => {
      this.handleHashChange();
    };
    this.$root.$on("bv::modal::hide", () => {
      window.history.back();
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
