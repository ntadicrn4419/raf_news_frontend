<template>
  <div>
    <h2>
      Kategorija: {{ category.name }}
    </h2>

    <h5>Opis:</h5>
    <p>
      {{ category.description }} <br><br>
    </p>

  </div>
</template>

<script>
export default {
  name: "CategoryCms",
  props: {
    category: {
      type: Object,
      required: true,
    }
  }
}
</script>
