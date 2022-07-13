<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>10 najnovijih vesti</h1>
    <div class="row">
      <div class="col-12">
        <b-card
            v-for="singleNews in news" :key="singleNews.id"
            :title="singleNews.title"
            :sub-title="singleNews.category"
            tag="article"
            style="max-width: 30rem;"
            class="mb-2"
            @click.prevent="goToSingleNewsPage(singleNews.id)"
        >
          <b-card-text>
            <a href="#">{{ singleNews.text | shortText }}</a>
          </b-card-text>
          <b-card-footer>{{singleNews.dateCreated}}</b-card-footer>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
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
  created () {
    this.$axios.get(`/api/news`).then((response) => {
      let tmp = response.data;
      for(let i = 0; i < tmp.length; i++){
        if(i === 10){
          break;
        }
        this.news[i] = tmp[i];
      }
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
