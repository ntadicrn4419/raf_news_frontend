<template>
  <div>
<!--    <div>-->
<!--      <h4>Current category name:</h4>-->
<!--      <p>{{category.name}}</p>-->
<!--      <h4>Current description:</h4>-->
<!--      <p>{{category.description}}</p>-->
<!--    </div>-->
    <form @submit.prevent="editCategory(category.name)">
      <div class="form-group">
        <label for="name">Name</label>
        <input v-model="name" type="text" class="form-control" id="name" placeholder="Enter new category name">
      </div>
      <div class="form-group">
        <label>Description</label>
        <b-textarea v-model="description" id="description" name="description" rows="10" cols="30" placeholder="Enter new category description"></b-textarea>
      </div>
      <button type="submit" class="btn btn-primary mt-2">Save changes</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "EditCategoryCmsComponent",
  props: {
    category: {
      type: Object,
      required: true,
    }
  },

  data(){
    return {
      // name: this.category.name,
      // description: this.category.description
      name: '',
      description: '',

      allCategories:[]
    }
  },

  methods: {
    editCategory(name){

      if(!this.validateInput()){
        return;
      }

      for(let i = 0; i < this.allCategories.length; i++){
        if(this.allCategories[i].name === this.name && this.allCategories[i].name !== name){//drugi deo if-a sluzi ako zelimo da ostavimo isti naziv kategorije koji je bio ranije
          alert("Failed. Category with that name already exists!");                          //gledamo da li postoji kategorija sa istim nazivom kao string koji je unet
          return;                                                                           //u polje, ali to se ne odnosi ime kategorije koju trenutno menjamo.
        }
      }

      this.$axios.put(`/api/categories/${name}`, {
        name: this.name,
        description: this.description,
      },).then(response => {

        this.$axios.put(`/api/news/update-category-name/${name}/${this.name}`, {
          // oldCategoryName: name,
          // newCategoryName: this.name
        }).catch(response =>{
          console.log(response)
        })

        this.$router.push({name: 'CategoriesCms'});
        this.$bus.$emit('updatedCategory', '');
      }).catch(response =>{
        console.log(response)
      })
    },
    validateInput(){
      if(this.name === null || this.name === ""){
        alert("Failed. Name can't be empty.");
        return false;
      }
      if(this.description === null || this.description === ""){
        alert("Failed. Description can't be empty.");
        return false;
      }
      return true;
    }
  },
  created() {
    this.$axios.get('/api/categories').then((response) => {
      this.allCategories = response.data;
    });
  }
}
</script>

<style scoped>

</style>