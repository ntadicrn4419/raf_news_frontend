<template>
  <div>
    <h1>Edit user:</h1>
    <form @submit.prevent="editUser(user.email)">
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
      <button type="submit" class="btn btn-primary mt-2">Save changes</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "EditUserCmsComponent",

  props: {
    user: {
      type: Object,
      required: true,
    }
  },

  data() {
    return {

      // firstname: this.user.firstname,
      // lastname: this.user.lastname,
      // email: this.user.email,
      // type: this.user.type,

      firstname: '',
      lastname: '',
      email: '',
      type: '',

      password: '',
      passwordAgain: '',

      allUsers: []
    }
  },
  methods: {
    editUser(email){

      if(!this.validateInput()){
        return;
      }

      for(let i = 0; i < this.allUsers.length; i++){
        if(this.allUsers[i].email === this.email && this.allUsers[i].email !== email){
          alert("Failed. User with that email already exists!");
          return;
        }
      }

      if(this.password.toString() !== this.passwordAgain.toString()){
        alert("Password and password again don't match!");
        return;
      }
      this.$axios.put(`/api/users/${email}`, {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        type: this.type.toString(),
        password: this.password,
        active: this.user.active
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
    this.$axios.get('/api/users').then((response) => {
      this.allUsers = response.data;
    });
  }
}
</script>

<style scoped>

</style>