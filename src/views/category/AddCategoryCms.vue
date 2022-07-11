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
      name: '',
      description: '',
    }
  },
  methods: {
    addNewCategory() {
      this.$axios.post('/api/categories', {
        name: this.name,
        description: this.description,
      },).then(response => {
        this.$router.push({name: 'CategoriesCms'});
        this.$bus.$emit('addedCategory', '');
      }).catch(response =>{
          console.log(response)
      })
    }
  },
}
</script>

<style scoped>

</style>