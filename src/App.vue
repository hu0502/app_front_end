<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
   
export default {
  name: "App",
  data() {
    return {};
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* margin-top: 60px; */
  width: 100%;
  overflow: auto;
}
</style>
