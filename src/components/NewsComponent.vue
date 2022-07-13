<template>
  <div>
    <h1>{{ singleNews.title }}</h1>
    <h5 v-if="singleNews.author">{{ singleNews.author.firstname }} {{singleNews.author.lastname}} - {{ singleNews.author.email }}, {{singleNews.dateCreated}}</h5>

    <ul>
      <li v-for="tag in singleNews.tagList" :key="tag.id">
        <ul>
          <li v-for="keyword in tag.keyWords" :key="keyword" @click.prevent="findNewsByTag(keyword)"><a href="#">{{ keyword }}</a></li>
        </ul>
      </li>
    </ul>

    <b-textarea id="newsText" readonly :value="singleNews.text"></b-textarea>
    <h3>Comments</h3>
    <b-card
        v-for="comment in singleNews.comments" :key="comment.id"
        :title="comment.author"
        tag="article"
        style="max-width: 30rem;"
        class="mb-2"
    >
      <b-card-text>
        {{ comment.text }}
      </b-card-text>
      <b-card-footer>{{comment.dateCreated}}</b-card-footer>
    </b-card>

    <div class="container" id="new-comment">
      <form @submit.prevent="addComment">
        <h5>New comment</h5>
        <div class="form-group">
          <label for="comment-author">Name</label>
          <input v-model="commentAuthor" class="form-control" id="comment-author" name="comment-author">
        </div>
        <div class="form-group">
          <label for="comment-content">Content</label>
          <textarea v-model="commentText" class="form-control" id="comment-content" name="comment-content" rows="3"></textarea>
        </div>
        <button type="submit" class="btn btn-primary mb-2">Submit comment</button>
      </form>
    </div>

  </div>
</template>

<script>
export default {
  name: "NewsComponent",
  props: {
    singleNews: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      commentAuthor: '',
      commentText: ''
    }
  },
  methods:{
    addComment(){
      this.$axios.post(`/api/news/addComment/${this.singleNews.id}`,{
        author: this.commentAuthor,
        text: this.commentText
      }).then((response) => {
        this.$router.go();
      });
    },
    findNewsByTag(keyword){
      this.$router.push({name: 'SimilarNewsByTag', params: {keyword: keyword}});
    }
  }
}
</script>

<style scoped>
#newsText{
  width: -moz-available;
  height: 400px;
}
</style>