<template>
  <div>
    <h1>Ovo su vesti iz content management sistema.</h1>
      <form @submit.prevent="searchNewsByTitleOrContent">
        <div class="row">
          <div class="col-4">
            <input v-model="searchNews" type="text" class="form-control" id="searchNews" placeholder="Search news by title or content">
          </div>
          <div class="col-4">
            <button type="submit" class="btn btn-primary mt-2">Search</button>
          </div>
        </div>
      </form>
    <br>
    <div class="row">
      <div class="col-12">
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Date created</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="singleNews in news" :key="singleNews.id">
            <td @click.prevent="goToSingleNewsPage(singleNews.id)"><a href="#">{{ singleNews.title }}</a></td>
            <td>{{singleNews.authorEmail}}</td>
            <td>{{singleNews.dateCreated}}</td>
            <td>  <button @click="goToEditNewsPage(singleNews.id)">Edit</button> </td>
            <td>  <button @click="deleteNews(singleNews.id)">Delete</button> </td>
          </tr>
          </tbody>
        </table>
        <button @click="goToAddNewsPage()">Add new news</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "NewsCms",
  data() {
    return {
      news: [],
      allNewsStorage: [],
      searchNews: ''
    }
  },
  created() {
    this.$axios.get('/api/news').then((response) => {
      this.news = response.data;
      this.news = this.news.sort(
          (objA, objB) => Number(Date.parse(objB.dateCreated)) - Number(Date.parse(objA.dateCreated)),
      );

      this.allNewsStorage = response.data;
      this.allNewsStorage = this.allNewsStorage.sort(
          (objA, objB) => Number(Date.parse(objB.dateCreated)) - Number(Date.parse(objA.dateCreated)),
      );

    });
  },
  methods:{
    goToAddNewsPage(){
      this.$router.push('/add-news-cms');
    },
    goToEditNewsPage(id){
      this.$router.push({name:'EditNewsCms', params: {id: id}});
    },
    goToSingleNewsPage(id){
      //this.$router.push({name:'SingleNews', params: {id: id}});
      this.$router.open({name:'SingleNews', params: {id: id}});
    },
    deleteNews(id){
      const question = window.confirm('Do you really want to delete this news?')
      if (!question) {
        return
      }

      this.$axios.delete('/api/news/'+id).then((response) => {
        this.news = response.data;
        this.$router.go()
      });
    },
    searchNewsByTitleOrContent(){
      if(this.searchNews === null || this.searchNews === ""){
        this.news = this.allNewsStorage;
        return;
      }
      console.log("u search f-ji je");
      let newsFilteredTmp = [];
      for(let i = 0; i < this.allNewsStorage.length; i++){
        console.log("u for-u je");
        if(this.allNewsStorage[i].title.toLowerCase().includes(this.searchNews.toLowerCase()) || this.allNewsStorage[i].text.toLowerCase().includes(this.searchNews.toLowerCase())){
          console.log("u if-u je");
          newsFilteredTmp.push(this.allNewsStorage[i]);
        }
      }
      this.news = newsFilteredTmp;
    }

  }
}
</script>

<style scoped>

</style>