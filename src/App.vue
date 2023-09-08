<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import store from "./store";
export default {
  mounted() {
    document.body.style.width = window.innerWidth + "px";
    window.addEventListener("resize", () => {
      store.commit("setMobile");
    })
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/index.scss";
html {
  font-size: 16px;
  margin: 0;
  padding: 0;
}
html,
#app {
  margin-right: calc(100% - 100vw);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-x: hidden;
}
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
