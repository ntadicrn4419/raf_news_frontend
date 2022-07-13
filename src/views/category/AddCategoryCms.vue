<template>
  <div>
    <h1>Add new category:</h1>
    <form @submit.prevent="addNewCategory">
      <div class="form-group">
        <label for="name">Name</label>
        <input v-model="name" type="text" class="form-control" id="name" placeholder="Enter name">
      </div>
      <div class="form-group">
        <b-textarea v-model="description" id="description" name="description" rows="10" cols="30" placeholder="Enter description"></b-textarea>
      </div>
      <button type="submit" class="btn btn-primary mt-2">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddCategoryCms.vue",
  data() {
    return {
      categories: [],
      name: '',
      description: '',
    }
  },
  methods: {
    addNewCategory() {

      if(!this.validateInput()){
        return;
      }

      for(let i = 0; i < this.categories.length; i++){
        if(this.categories[i].name === this.name){
          alert("Failed. Category with that name already exists!");
          return;
        }
      }

      this.$axios.post('/api/categories', {
        name: this.name,
        description: this.description,
      },).then(response => {
        this.$router.push({name: 'CategoriesCms'});
        this.$bus.$emit('addedCategory', '');
      }).catch(response =>{
          console.log(response)
      })
    },
    validateInput(){
      if(this.name === null || this.name === ""){
        alert("Failed. Name can't be empty.");
        return false;
      }
      if(this.description === null || this.description === ""){
        alert("Failed. Description can't be empty.");
        return false;
      }
      return true;
    }
  },
  created() {
    this.categories = this.$route.params.categories;
  }
}
</script>

<style scoped>

</style>