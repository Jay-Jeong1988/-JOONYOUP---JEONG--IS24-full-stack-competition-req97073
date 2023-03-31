<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);
export default {
  name: "App",
  components: { },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
  },
  mounted() {
    this.$store.state.isMobile = window.innerWidth <= 924
    window.addEventListener("resize", ()=>{
      this.$store.state.isMobile = window.innerWidth <= 924
    })
  }
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
