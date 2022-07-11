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
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      email: this.user.email,
      type: this.user.type,
      password: '',
      passwordAgain: ''
    }
  },
  methods: {
    editUser(email){
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
        active: true
      },).then(response => {
        this.$router.push({name: 'UsersCms'});
      }).catch(response =>{
        console.log(response)
      })
    }
  }
}
</script>

<style scoped>

</style>