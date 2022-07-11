<template>
  <div>
    <edit-user-cms-component :user="user"></edit-user-cms-component>
  </div>
</template>

<script>

import EditUserCmsComponent from "@/components/EditUserCmsComponent";

export default {
  name: "EditUserCms",
  components: {EditUserCmsComponent},

  data() {
    return {
      user: {}
    }
  },

  created () {
    this.$axios.get(`/api/users/${this.$route.params.email}`).then((response) => {
      this.user = response.data;
    });
  },
}
</script>

<style scoped>

</style>