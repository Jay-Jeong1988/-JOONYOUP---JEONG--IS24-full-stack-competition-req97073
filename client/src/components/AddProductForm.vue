<template>
  <div class="addProductForm">
    <div class="createCardForm">
      <h1 style="margin-bottom: 1em;">Direct Message</h1>
      <div class="errors" v-if="responseErrors.length > 0">
        <small v-for="(e, i) in responseErrors" :key="i" style="color: red;">
          {{ e.split(":")[1].includes("Cast to Date") ? (i+1)+ "." + "Please make sure if date is correct." : (i+1)+ "." + e.split(":")[1] }}
          <br />

        </small>
      </div>
      <div>
        <label>Product Name</label>
        <input class="form-control" v-model="newProductData.productName" type="text" />
      </div>
      <div>
        <label>Scrum Master Name</label>
        <input class="form-control" v-model="newProductData.scrumMasterName" type="text" placeholder="" />
      </div>
      <div>
        <label>Product Owner</label>
        <input class="form-control" v-model="newProductData.productOwnerName" type="text" placeholder="" />
      </div>
      <div>
        <label>Developer Name</label>
        <div
          v-for="(developer, index) in newProductData.developers"
          :key="`developer-${index}`"
          class="input wrapper flex items-center"
        >
          <input class="form-control developerForm" :id="`developer-${index}`" type="text" placeholder="Enter developer's name" />
          <button v-show="newProductData.developers.length > 1" class="btn btn-outline-danger" @click="removeDeveloperForm()">Remove -</button>
        </div>
        <button class="btn btn-outline-secondary" @click="addDeveloperForm()">Add developer +</button>
      </div>
      <div>
        <label>Start Date</label>
        <b-form-datepicker id="datepicker" v-model="newProductData.startDate" class="mb-2"></b-form-datepicker>
      </div>
      <div>
        <label>Methodology</label>
        <div class="dropdown">
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Selected: {{ newProductData.methodology }}
          </button>
          <ul class="dropdown-menu">
            <li><a @click="newProductData.methodology = 'Agile'" class="dropdown-item" href="#pmOpen">Agile</a></li>
            <li><a @click="newProductData.methodology = 'Waterfall'" class="dropdown-item" href="#pmOpen">Waterfall</a></li>
          </ul>
        </div>
      </div>
      <button class="btn btn-block btn-lg btn-success done" @click="createProduct">Complete</button>
    </div>
    <b-modal
      centered
      v-model="succeeded"
      hide-header
      hide-footer
      dialog-class=""
      content-class="border-0 bg-transparent succeeded align-items-center"
      body-class="bookingPage succeeded"
      id="successModal"
    >
      <b-button size="sm" variant @click="closeAddProductModal()" style="background-color: transparent; border: none; margin-left: auto;">
        <img class="successIcon" src="../assets/images/checked.svg" alt="success icon"/>
        <h2>Product has been added</h2>
      </b-button>
    </b-modal>
  </div>
</template>

<script>
import api from '../service/api'
export default {
  name: "AddProductForm",
  data() {
    return {
      newProductData: {
        productName: "",
        scrumMasterName: "",
        productOwnerName: "",
        developers: [""],
        startDate: null,
        methodology: ""
      },
      responseErrors: [],
      succeeded: false,
    };
  },
  computed: {
  },
  methods: {
    addDeveloperForm(){
      this.newProductData.developers.push();
    },
    removeDeveloperForm() {
      this.newProductData.developers.pop();
    },
    closeAddProductModal() {
      this.$bvModal.hide("successModal")
    },
    createProduct(){
      api.create(this.newProductData).then(response => {
        // this.products.push(response);
        console.log(response)
      })
      .catch(e => {
        console.log(e);
      })
    },
  },
  mounted() {
  },
  components: { },
  props: []
};
</script>

<style lang="sass">

.addProductModal
  padding: 1.7em
  padding-top: 0
  +flexAllCenter

.addProductModal div 
  text-align: center

.createCardForm > div 
  margin-bottom: 0.5em

.createCardForm input,
.createCardForm label 
  display: inline

.done 
  margin-top: 1em

.successIcon 
  width: 17em

@media only screen and (max-width: 600px) 
  .successIcon 
    width: 12em
  

</style>
