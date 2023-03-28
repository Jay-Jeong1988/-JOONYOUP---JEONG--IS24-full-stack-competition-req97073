<template>
  <div class="">
    <p v-for="product in products"></p>
  </div>
</template>

<script>
import api from '../service/api';
export default {
  name: "Lan",
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
