<template>
  <edit-category-cms-component :category="category"></edit-category-cms-component>
</template>

<script>
import EditCategoryCmsComponent from "@/components/EditCategoryCmsComponent";
export default {
  name: "EditCategoryCms.vue",
  components: {EditCategoryCmsComponent},

  data() {
    return {
      category: {}
    }
  },

  created () {
    this.$axios.get(`/api/categories/${this.$route.params.name}`).then((response) => {
      this.category = response.data;
    });
  }
}
</script>

<style scoped>

</style>