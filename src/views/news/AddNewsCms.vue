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
        <input v-model="tags" type="text" class="form-control" id="tags" placeholder="Enter keywords separated by ','">
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
      authorEmail: '',
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
    this.authorEmail = localStorage.getItem("email");
  },

  methods: {
    addNewNews() {
      if(!this.validateInput()){
        return;
      }
      this.$axios.post('/api/news', {
        authorEmail: this.authorEmail,
        title: this.title,
        category: this.category.toString(),
        tags: this.tags,
        text: this.text
      },).then(response => {
        this.$router.push({name: 'NewsCms'});
      }).catch(response =>{
        console.log(response)
      })
    },
    validateInput(){
      if(this.title === null || this.title === ""){
        alert("Failed. Title can't be empty.");
        return false;
      }
      if(this.category === null || this.category.toString() === ""){
        alert("Failed. Category can't be empty.");
        return false;
      }
      if(this.text === null || this.text === ""){
        alert("Failed. Text can't be empty.");
        return false;
      }
      return true;
    }
  },
}
</script>

<style scoped>

</style>