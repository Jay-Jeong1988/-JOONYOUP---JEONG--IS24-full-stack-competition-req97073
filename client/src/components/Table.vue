<template>
  <div class="tableContainer">
    <table id="tableComponent" class="table table-bordered table-striped">
      <thead>
        <tr>
          <!-- loop through each value of the fields to get the table header -->
          <th  v-for="(field, index) in fields" :key="index" @click="sortTable(field)" > 
            {{field}} <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i>
          </th>
        </tr>
      </thead>
      <tbody>
          <!-- Loop through the list get the each product data -->
          <tr v-for="item in items" :key="item">
          <td v-for="(dataKey, index) in dataKeys" :key="index">{{item[dataKey]}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
export default {
  name: "Table",
  data() {
    return {
      dataKeys: []
    };
  },
  props: ['fields','items'],
  methods: {
    switchFieldsWithDataKeys(){
      for (let field of this.fields){
        switch(field) {
          case "Product Number":
            this.dataKeys.push("productId")
            break;
          case "Product Name":
            this.dataKeys.push("productName")
            break;
          case "Scrum Master":
            this.dataKeys.push("scrumMasterName")
            break;
          case "Product Owner":
            this.dataKeys.push("productOwnerName")
            break;
          case "Developer Names":
            this.dataKeys.push("developers")
            break;
          case "Start Date":
            this.dataKeys.push("startDate")
            break;
          case "Methodology":
            this.dataKeys.push("methodology")
            break;
          default:
            console.log(`switching ended`)
        }
      }
    }
  },
  created(){
    this.switchFieldsWithDataKeys()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
