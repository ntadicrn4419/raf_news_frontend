<template>
  <div>
    <div>
      <category-component :category="this.category"></category-component>
    </div>
    <div class="row">
      <div class="col-12">
<!--        <table class="table">-->
<!--          <thead>-->
<!--          <tr>-->
<!--            <th scope="col">Title</th>-->
<!--            <th scope="col">Text</th>-->
<!--            <th scope="col">Date created</th>-->
<!--          </tr>-->
<!--          </thead>-->
<!--          <tbody>-->
<!--          <tr v-for="singleNews in news" :key="singleNews.id">-->
<!--            <td>{{ singleNews.title }}</td>-->
<!--            <td>{{ singleNews.text | shortText }}</td>-->
<!--            <td>{{ singleNews.dateCreated }}</td>-->
<!--          </tr>-->
<!--          </tbody>-->
<!--        </table>-->
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
  </div>
</template>

<script>
import CategoryComponent from "@/components/CategoryComponent";

export default {
  name: "SingleCategory",
  components: { CategoryComponent },
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
      category: {},
      news: []
    }
  },
  created () {
    this.$bus.$on('clickedOnCategoryNavBar', () => {
      this.$router.go();
    })
    this.$axios.get(`/api/categories/${this.$route.params.name}`).then((response) => {
      this.category = response.data;
    });
    this.$axios.get(`/api/news/${this.$route.params.name}`).then((response) => {
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