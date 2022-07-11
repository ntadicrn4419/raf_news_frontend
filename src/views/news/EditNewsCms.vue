<template>
  <div>
    <edit-news-cms-component :news="news"></edit-news-cms-component>
  </div>
</template>

<script>
import EditNewsCmsComponent from "@/components/EditNewsCmsComponent";
export default {
  name: "EditNewsCms",
  components: {EditNewsCmsComponent},

  data() {
    return {
      news: {}
    }
  },

  created () {
    this.$axios.get(`/api/news/find/${this.$route.params.id}`).then((response) => {
      this.news = response.data;
    });
  },
}
</script>

<style scoped>

</style>