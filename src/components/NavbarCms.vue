<template>
  <div>
    <div class="container">
      <b-button v-b-toggle.sidebar-no-header>RAF News CMS panel</b-button>
    </div>
    <b-sidebar visible id="sidebar-no-header" lazy="lazy" width="220px" aria-labelledby="sidebar-no-header-title" no-header shadow>
      <template>
        <div class="p-3">
          <h4 id="sidebar-no-header-title">Raf News CMS</h4>
          <p>
            Raf News Content Management System panel for admins and content creators.
          </p>
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item to="/categories-cms">Categories</b-nav-item>
              <b-nav-item to="/news-cms">News</b-nav-item>
              <b-nav-item v-if="isAdminUser" to="/users-cms">Users</b-nav-item>
            </b-nav>
          </nav>
          <b-button  v-b-toggle.sidebar-no-header variant="secondary" block>Hide panel</b-button>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: "NavbarCms",
  computed: {
    isAdminUser() {
      const jwt = localStorage.getItem("jwt");
      const payload = JSON.parse(atob(jwt.split('.')[1]));
      if(payload.type != null){
        return payload.type.localeCompare("admin") === 0;
      }
      return false;
    }
  }
}
</script>

<style scoped>

</style>
