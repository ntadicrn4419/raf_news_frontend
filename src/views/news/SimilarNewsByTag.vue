<template>
  <div class="row">
    <div class="col-12">
      <b-card
          v-for="singleNews in news" :key="singleNews.id"
          :title="singleNews.title"
          tag="article"
          style="max-width: 30rem;"
          class="mb-2"
          @click="goToSingleNewsPage(singleNews.id)"
      >
        <b-card-text>
          {{ singleNews.text | shortText }}
        </b-card-text>
        <b-card-footer>{{singleNews.dateCreated}}</b-card-footer>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "SimilarNewsByTag",
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
      news: []
    }
  },
  created(){
    this.$axios.get(`/api/news/similar-news/${this.$route.params.keyword}`).then((response) => {
      this.news = response.data;
      this.news = this.news.sort(
          (objA, objB) => Number(Date.parse(objB.dateCreated)) - Number(Date.parse(objA.dateCreated)),
      );
    });
  },
  methods:{
    goToSingleNewsPage(id){
      this.$router.push({name: 'SingleNews', params: {id: id}});
    }
  }
}
</script>

<style scoped>

</style>