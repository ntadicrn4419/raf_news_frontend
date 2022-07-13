<template>
  <div>
    <h1>Add new user:</h1>
    <form @submit.prevent="addNewUser">
      <div class="form-group">
        <label for="firstname">Firstname</label>
        <input v-model="firstname" type="text" class="form-control" id="firstname" placeholder="Enter firstname">
      </div>
      <div class="form-group">
        <label for="lastname">Lastname</label>
        <input v-model="lastname" type="text" class="form-control" id="lastname" placeholder="Enter lastname">
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="email" type="email" class="form-control" id="email" placeholder="Enter email">
      </div>
      <div class="form-group">
        <label>Type</label>
        <select v-model="type" class="form-control">
          <option disabled value="">Please select one type</option>
          <option>content_creator</option>
          <option>admin</option>
        </select>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="password" type="password" class="form-control" id="password" placeholder="Enter password">
      </div>
      <div class="form-group">
        <label for="passwordAgain">Password again</label>
        <input v-model="passwordAgain" type="password" class="form-control" id="passwordAgain" placeholder="Enter password again to confirm">
      </div>
      <button type="submit" class="btn btn-primary mt-2">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddUserCms",
  data() {
    return {
      users:[],
      firstname: '',
      lastname: '',
      email: '',
      type: '',
      password: '',
      passwordAgain: ''
    }
  },
  methods: {
    addNewUser(){

      if(!this.validateInput()){
        return;
      }

      for(let i = 0; i < this.users.length; i++){
        if(this.users[i].email === this.email){
          alert("Failed. User with that email already exists!");
          return;
        }
      }

      if(this.password.toString() !== this.passwordAgain.toString()){
        alert("Password and password again don't match!");
        return;
      }
      this.$axios.post('/api/users', {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        type: this.type.toString(),
        password: this.password,
        active: true
      },).then(response => {
        this.$router.push({name: 'UsersCms'});
      }).catch(response =>{
        console.log(response)
      })
    },
    validateInput(){
      if(this.firstname === null || this.firstname === ""){
        alert("Failed. Firstname can't be empty.");
        return false;
      }
      if(this.lastname === null || this.lastname === ""){
        alert("Failed. Lastname can't be empty.");
        return false;
      }
      if(this.email === null || this.email === ""){
        alert("Failed. Email can't be empty.");
        return false;
      }
      if(this.type === null || this.type.toString() === ""){
        alert("Failed. Type can't be empty.");
        return false;
      }
      if(this.password === null || this.password === ""){
        alert("Failed. Password can't be empty.");
        return false;
      }
      return true;
    }
  },
  created() {
    this.users = this.$route.params.users;
  }
}
</script>

<style scoped>

</style>