<!-- 首页 -->
<template>
  <div>
    <div>文章数 {{this.articles}}</div>
    <div>点赞数 {{this.likes}}</div>
    <div>粉丝数 {{this.fans}}</div>
    <div>人气数 {{this.mood}}</div>
    <div>字数 {{this.numberSize}}</div>
    <button @click="click">更新</button>
  </div>
</template>

<script>
import { updateData } from "../request/api";
export default {
  data() {
    return { articles: 0, fans, likes, numberSize, mood };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    click() {
      updateData()
        .then(res => {
          this.articles = res.articles.count;
          this.fans = res.fans.count;
          this.likes = res.likes.count;
          this.numberSize = res.numberSize;
          this.mood = res.mood;
          this.$message("成功");
        })
        .catch(res => {});
    }
  }
};
</script>
<style>
</style>