<template>
  <div class="pt-5">
    <h1 v-if="email">Hello, {{ email }}</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="email" type="text" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="password" type="password" class="form-control" id="password" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-primary mt-2">Submit</button>
    </form>
  </div>
</template>

<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    login() {
      this.$axios.post('/api/users/login', {
        email: this.email,
        password: this.password,
      },).then(response => {
        localStorage.setItem('jwt', response.data.jwt);
        localStorage.setItem('email', this.email);
        this.$router.push({name: 'CategoriesCms'});
        this.$bus.$emit('logged', 'user_logged_in');
      }).catch(response =>{
        console.log(response.message);
        alert("Failed. Wrong credentials or user has been deactivated by admin.");
        localStorage.setItem('jwt', null);
      })
    }
  },
}
</script>

<style scoped>

</style>
