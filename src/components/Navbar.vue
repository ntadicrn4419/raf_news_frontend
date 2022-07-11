<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">RAF News</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'Home'}">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'MostRead'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'MostRead'}">Most read</router-link>
            </li>
<!--            <li class="nav-item">-->
<!--              <router-link :to="{name: 'Categories'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'Categories'}">Categories</router-link>-->
<!--            </li>-->
            <li class="nav-item">
              <b-dropdown class="b-dropdown-text" text="Categories">
                <b-dropdown-item v-for="category in categories" :key="category.id" href="#" @click="goToSingleCategoryPage(category.name)">{{category.name}}</b-dropdown-item>
              </b-dropdown>
            </li>

          <li class="nav-item">
            <form v-if="canLogout" class="d-flex" @submit.prevent="logout">
                <h6 class="nav-link" id="currentUser">{{currentUserEmail}}</h6>
                <button class="btn btn-outline-secondary" type="submit">Logout</button>
            </form>
            <form v-else class="d-flex" @submit.prevent="login">
              <button class="btn btn-outline-secondary" type="submit">Login</button>
            </form>
          </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Navbar",
  computed: {
    canLogout() {
      let jwt = localStorage.getItem("jwt");
      if(jwt == null){
        return false;
      }
      let mail = localStorage.getItem("email");
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentUserEmail = mail;
      return true;
    },
  },
  data(){
    return {
      currentUserEmail: '',
      categories: []
    }
  },
  methods: {

    logout() {
      localStorage.removeItem('jwt');
      localStorage.removeItem('email');
      this.$bus.$emit('logged', 'user_logged_out');
      this.$router.push({name: 'Login'});
    },
    login() {
      this.$router.push({name: 'Login'});
    },
    goToSingleCategoryPage(name){
      this.$router.push({name: 'SingleCategory', params: {name: name}});
      this.$bus.$emit('clickedOnCategoryNavBar', '');
    },
  },
  created() {
    this.$axios.get('/api/categories').then((response) => {
      this.categories = response.data;
    });
    this.$bus.$on('addedCategory', () => {
      this.$router.go();
    })
    this.$bus.$on('updatedCategory', () => {
      this.$router.go();
    })
  }
}
</script>

<style scoped>

</style>
