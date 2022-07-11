<template>
  <div class="users-cms">
    <h1>Ovo su korisnici iz content management sistema.</h1>
    <div class="row">
      <div class="col-12">
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Full name</th>
            <th scope="col">Email</th>
            <th scope="col">Type</th>
            <th scope="col">Active</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{user.firstname}} {{user.lastname}}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.type }}</td>
            <td>{{ user.active }}</td>
            <td>  <button @click="goToEditUserPage(user.email)">Edit</button> </td>
            <td v-if="user.type === 'content_creator'">  <button @click="activateDeactivateUser(user.email)">Activate/Deactivate</button> </td>
          </tr>
          </tbody>
        </table>
        <button @click="goToAddUserPage()">Add new user</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UsersCms",
  data() {
    return {
      users: []
    }
  },
  created() {
    this.$axios.get('/api/users').then((response) => {
      this.users = response.data;
    });
  },
  methods: {
    goToAddUserPage(){
      this.$router.push('/add-user-cms');
    },
    goToEditUserPage(email){
      this.$router.push({name:'EditUserCms', params: {email: email}});
    },
    activateDeactivateUser(email){
      this.$axios.get(`/api/users/activate-deactivate/${email}`).then((response) => {
        this.$router.go();
      }).catch(response =>{
        console.log(response);
      })
    }
  }
}
</script>

<style scoped>

</style>