<template>
  <div>
    <h1>Edit news:</h1>
    <form @submit.prevent="editNews(news.id)">
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
      <button type="submit" class="btn btn-primary mt-2">Save changes</button>
    </form>
  </div>
</template>

<script>

export default {
  name: "EditNewsCmsComponent",

  props: {
    news: {
      type: Object,
      required: true,
    }
  },

  data() {
    return {
      categories: [],
      title: this.news.title,
      category: this.news.category,
      tags: this.news.tags,
      text: this.news.text
    }
  },

  methods: {
    editNews(id){
      this.$axios.put(`/api/news/${id}`, {
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
  },

  created() {
    this.$axios.get('/api/categories').then((response) => {
      this.categories = response.data;
    });
  },

}
</script>

<style scoped>

</style>