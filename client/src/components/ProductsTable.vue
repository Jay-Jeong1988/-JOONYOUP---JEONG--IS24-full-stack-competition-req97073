<template>
  <div class="productsTable">
    <p>Products: {{ productCount }}</p>
    <button type="button" class="btn btn-outline-secondary" @click="openProductModal">Add Product</button>
    <button type="button" class="btn btn-outline-secondary" @click="toggleEditMode">Edit Product</button>
    <b-modal
      v-if="$store.state.productModalShow"
      centered
      hide-footer
      dialog-class=""
      content-class="shadow-lg bookingPage"
      body-class="bookingPage"
      header-class="border-0"
      id="addProductModal"
    >
      <template v-slot:modal-header="{}">
        <b-button size="sm" variant @click="$bvModal.hide('addProductModal')" style="background-color: transparent; border: none; margin-left: auto;">
          <img src="../assets/images/cancel-black.svg" alt="close icon" style="width:2em"/>
        </b-button>
      </template>
      <AddProductForm :selectedProductId="selectedProductId" :products="products" @recallProducts="updateProducts"/>
    </b-modal>
    <Table @selectedProductId="selectProduct" :openProductModal="openProductModal" :editMode="editMode" :fields="productFields" :items="products"/>
  </div>
</template>

<script>
import api from '../service/api'
import Table from './Table.vue'
import AddProductForm from './AddProductForm'
export default {
  name: "ProductsTable",
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
      ],
      editMode: false,
      selectedProductId: ""
    };
  },
  computed: {
    productCount(){
      return this.products.length
    }
  },
  components: {
    Table, AddProductForm
  },
  methods: {
    selectProduct(selectedProductId){
      this.selectedProductId = selectedProductId
    },
    toggleEditMode(){
      this.editMode = !this.editMode
    },
    updateProducts(newProducts){
      this.products = newProducts
    },
    openProductModal() {
      this.$store.state.targetModalId = "addProductModal"
      window.location.hash += this.$store.state.openProductModalHashId
    },
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
