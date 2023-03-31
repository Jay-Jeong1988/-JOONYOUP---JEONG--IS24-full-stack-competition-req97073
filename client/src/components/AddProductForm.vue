<template>
  <div class="addProductForm">
    <div class="createCardForm">
      <h1 style="margin-bottom: 1em;">Add product</h1>
      <div class="errors" v-if="isInputError">
        <small style="color: red;">
          {{ "Please make sure if all informations are filled in" }}
          <br />

        </small>
      </div>
      <div>
        <label>Product Name</label>
        <input class="form-control" v-model="newProductData.productName" type="text"/>
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
          v-for="n in developerCount"
          :key="`developer-${n}`"
          class="input wrapper flex items-center developerFormContainer"
        >
          <input class="form-control developerForm" :id="`developer-${n}`" type="text" placeholder="Enter developer's name" />
        </div>
        <div class="addRemoveBtnsContainer">
          <button v-show="developerCount > 1" class="btn btn-outline-danger" @click="removeDeveloperForm()">Remove -</button>
          <button v-show="developerCount < 5" class="btn btn-outline-secondary" @click="addDeveloperForm()">Add developer +</button>
        </div>
      </div>
      <div>
        <label>Start Date</label>
        <b-form-datepicker id="datepicker" :max="maxDate" v-model="newProductData.startDate" class="mb-2"></b-form-datepicker>
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
      <button class="btn btn-block btn-lg btn-success done" @click="createProduct">Save</button>
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
        developers: [],
        startDate: "",
        methodology: ""
      },
      isInputError: false,
      succeeded: false,
      developerCount: 1
    };
  },
  computed: {
    maxDate(){
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const maxDate = new Date(today)
      return maxDate
    }
  },
  methods: {
    checkConstraints(){
      for (const value of Object.values(this.newProductData)){
        if (typeof value === 'string' || value instanceof String) {
          if (!value) return false
        }else if(Array.isArray(value)){
          if (value.length <= 0) return false
        }
      }
      return true;
    },
    addDeveloperForm(){
      if(this.developerCount < 5) this.developerCount+=1;
    },
    removeDeveloperForm() {
      if(this.developerCount > 1) this.developerCount-=1;
    },
    closeAddProductModal() {
      this.$bvModal.hide("successModal")
    },
    createProduct(){
      const developersEl = document.getElementsByClassName("developerForm");
      for (let element of developersEl) {
        if(element.value) this.newProductData.developers.push(element.value)
        else window.alert("There has to be at least one developer name") 
        element.value = ""
      }
      
      if (this.checkConstraints()){
        this.isInputError = false
        api.create(this.newProductData).then(response => {
          this.$emit("recallProducts", response.data)
          console.log(response)
          this.newProductData = {
            productName: "",
            scrumMasterName: "",
            productOwnerName: "",
            developers: [],
            startDate: null,
            methodology: ""
          }
          this.developerCount = 1
          this.$bvModal.hide('addProductModal')
        })
        .catch(e => {
          console.log(e);
        })
      }else this.isInputError = true
    },
  },
  mounted() {
    if (this.selectedProductId){
      api.get(this.selectedProductId).then(response => {
        this.newProductData = response.data
        let developerEl = document.getElementById("developer"+"-1")
        developerEl.value = this.newProductData.developers[0]
      })
      
    }
  },
  created(){},
  components: { },
  props: [ "products", "selectedProductId" ]
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

.developerFormContainer
  margin-top: 1em

.addRemoveBtnsContainer
  margin-top: 1em;

@media only screen and (max-width: 600px) 
  .successIcon 
    width: 12em
  

</style>
