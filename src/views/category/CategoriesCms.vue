<template>
  <div class="categories-cms">
    <h1>Ovo su kategorije iz content management sistema.</h1>
    <div class="row">
      <div class="col-12">
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="category in categories" :key="category.id">
            <td><a @click="goToSingleCategoryPage(category.name)">{{category.name}}</a></td>
            <td>{{ category.description | shortText }}</td>
            <td>  <button @click="goToEditCategoryPage(category.name)">Edit</button> </td>
            <td>  <button @click="deleteCategory(category.name)">Delete</button> </td>
          </tr>
          </tbody>
        </table>
        <button @click="goToAddCategoryPage()">Add new category</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoriesCms.vue",
  filters: {
    shortText(value) {
      if (value.length < 30) {
        return value;
      }
      return value.slice(0, 30) + '...'
    }
  },
  data() {
    return {
      categories: []
    }
  },
  methods: {
    goToAddCategoryPage(){
      this.$router.push('/add-category-cms');
    },
    goToEditCategoryPage(name){
      this.$router.push({name:'EditCategoryCms', params: {name: name}});
    },
    goToSingleCategoryPage(name){
      this.$router.push({name: 'SingleCategoryCms', params: {name: name}});
    },
    deleteCategory(name){

      const question = window.confirm('Do you really want to delete this category and all news in it?')
      if (!question) {
        return
      }

      this.$axios.delete('/api/categories/'+name).then((response) => {
        this.categories = response.data;
        this.$router.go()
      });
    }
  },
  created() {
    this.$axios.get('/api/categories').then((response) => {
      this.categories = response.data;
    });
  }
}
</script>

<style scoped>

</style>