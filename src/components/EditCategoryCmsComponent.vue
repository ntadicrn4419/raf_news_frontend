<template>
  <div>
    <form @submit.prevent="editCategory(category.name)">
      <div class="form-group">
        <label for="name">Name</label>
        <input v-model="name" type="text" class="form-control" id="name" placeholder="Enter new category name">
      </div>
      <div class="form-group">
        <label>Description</label>
        <b-textarea v-model="description" id="description" name="description" rows="10" cols="30" placeholder="Enter new category description"></b-textarea>
      </div>
      <button type="submit" class="btn btn-primary mt-2">Save changes</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "EditCategoryCmsComponent",
  props: {
    category: {
      type: Object,
      required: true,
    }
  },

  data(){
    return {
      name: this.category.name,
      description: this.category.description
    }
  },

  methods: {
    editCategory(name){
      this.$axios.put(`/api/categories/${name}`, {
        name: this.name,
        description: this.description,
      },).then(response => {

        this.$axios.put(`/api/news/update-category-name/${name}/${this.name}`, {
          // oldCategoryName: name,
          // newCategoryName: this.name
        }).catch(response =>{
          console.log(response)
        })

        this.$router.push({name: 'CategoriesCms'});
        this.$bus.$emit('updatedCategory', '');
      }).catch(response =>{
        console.log(response)
      })
    }
  }
}
</script>

<style scoped>

</style>