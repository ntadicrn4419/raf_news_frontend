<template>
  <div>
    <h1>Add new news:</h1>
    <form @submit.prevent="addNewNews">
      <div class="form-group">
        <label for="title">Title</label>
        <input v-model="title" type="text" class="form-control" id="title" placeholder="Enter title">
      </div>
      <div class="form-group">
        <label>Category</label>
        <select v-model="category" class="form-control">
          <option disabled value="">Please select one category</option>
          <option v-for="category in categories" :key="category.id">{{category.name}}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="tags">Tags</label>
        <input v-model="tags" type="text" class="form-control" id="tags" placeholder="Enter tags">
      </div>
      <div class="form-group">
        <label>Text</label>
        <b-textarea v-model="text" id="text" name="text" rows="10" cols="30" placeholder="Enter text"></b-textarea>
      </div>
      <button type="submit" class="btn btn-primary mt-2">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddNewsCms",

  data() {
    return {
      categories: [],
      title: '',
      category: '',
      tags: '',
      text: ''
    }
  },

  created() {
    this.$axios.get('/api/categories').then((response) => {
      this.categories = response.data;
    });
  },

  methods: {
    addNewNews() {
      this.$axios.post('/api/news', {
        title: this.title,
        category: this.category.toString(),
        tags: this.tags,
        text: this.text
      },).then(response => {
        this.$router.push({name: 'NewsCms'});
      }).catch(response =>{
        console.log(response)
      })
    }
  }

}
</script>

<style scoped>

</style>