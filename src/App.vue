<template>
  <div class="container">
    <Navbar/>
    <NavbarCms v-if="isLoggedIn"/>

    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import NavbarCms from "./components/NavbarCms";

export default {
  components: {Navbar, NavbarCms},
  computed: {
    isLoggedIn() {
      let jwt = localStorage.getItem("jwt");
      if(jwt == null){
        return false;
      }
      return true;
    }
  },
  created () {
    this.$bus.$on('logged', () => {
      this.$router.go();
    })
  }
}


</script>
