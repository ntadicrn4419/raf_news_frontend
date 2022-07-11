<template>
  <news-component :singleNews="this.singleNews"></news-component>
</template>

<script>
import NewsComponent from "@/components/NewsComponent";
export default {
  name: "SingleNews",
  components: {NewsComponent},
  data() {
    return {
      singleNews: {}
    }
  },
  created () {
    this.$axios.get(`/api/news/find/${this.$route.params.id}`).then((response) => {
      this.singleNews = response.data;
    });
  }
}
</script>

<style scoped>

</style>