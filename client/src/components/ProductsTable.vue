<template>
  <div class="ProductsTable">
    <Table :fields="productFields" :items="products"/>
  </div>
</template>

<script>
import api from '../service/api'
import Table from './Table.vue'
export default {
  name: "Products Table",
  data() {
    return {
      products: [],
      productFields: [
        'Product Number',
        'Product Name',
        'Scrum Master',
        'Product Owner',
        'Developer Names',
        'Start Date',
        'Methodology'
      ]
    };
  },
  components: {
    Table
  },
  methods: {
    getProducts() {
      api.getAll().then(response => {
        this.products = response.data;
      })
      .catch(e => {
        console.log(e);
      });
    },
  },
  created(){
    this.getProducts();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
