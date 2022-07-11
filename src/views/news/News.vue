<template>
  <div class="news">
    <h1>This is news page</h1>
    <HelloWorld msg="Welcome to News App"/>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld";

export default {
  name: 'NewsView',
  components: {
    HelloWorld
  }
}
</script>

<style scoped>

</style>