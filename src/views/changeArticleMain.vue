<!-- 修改文章详情 -->
<template>
  <div>
    <div class="title">{{this.data.title}}</div>
    <div class="dsc">{{this.data.dsc}}</div>
    <div class="date">
      更新时间 :
      <i>{{this.data.updateAt}}</i>
    </div>
    <mavon-editor
      :placeholder="'未编辑内容...卤蛋正在努力创作中'"
      v-model="this.data.content"
      :previewBackground="'#424242'"
      :boxShadowStyle="'1px 1px 1px  rgba(255,255,255,0.2)'"
      style="color:beige;width:90%;margin:0 auto"
      code-style="atelier-plateau-light"
      @save="save"
      @imgAdd="$imgAdd"
    ></mavon-editor>
  </div>
</template>

<script>
import { adminGetArticlesMain, adminChangeArticlesMain } from "../request/api";

export default {
  data() {
    return { data: [] };
  },

  components: {},

  computed: {},

  mounted() {
    let articleId = this.$route.query.articleId;
    adminGetArticlesMain({ articleId: articleId })
      .then(res => {
        this.data = res.result[0];
      })
      .catch(res => {});
  },

  methods: {
    //   保存
    save(value, values) {
      adminChangeArticlesMain({
        articleId: this.data.articleId,
        content: value
      })
        .then(res => {
          this.$message.success("更新成功！");
          this.data.updateAt = res.updateAt;
        })
        .catch(res => {
          this.$message.error("服务器开小差了！");
        });
    }
  }
};
</script>
<style scoped>
.title {
  font-size: 30px;
  color: bisque;
  text-align: center;
  margin-top: 10px;
}

.dsc {
  font-size: 20px;
  color: #999;
  text-align: center;
  margin-top: 10px;
}

.date {
  font-size: 12px;
  color: #999;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}

.date i {
  color: rgba(81, 250, 75, 0.719);
}
</style>