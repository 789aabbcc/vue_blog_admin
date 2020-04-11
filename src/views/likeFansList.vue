<!-- 喜欢粉丝管理 -->
<template>
  <div>
    <!-- 头部面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-bottom:20px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>粉丝 : {{this.tableData1.length}} 喜欢 : {{this.tableData2.length}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs v-model="activeName" @tab-click="handleClick" :tab-position="'left'">
      <el-tab-pane label="粉丝列表" name="first">
        <el-table ref="singleTable" :data="tableData1" highlight-current-row style="width: 40%">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column property="createAt" label="创建日期" width="200"></el-table-column>
          <el-table-column property="content" label="联系方式" width="200"></el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="喜欢列表" name="second">
        <el-table ref="singleTable" :data="tableData2" highlight-current-row style="width: 50%">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column property="createAt" label="创建日期" width="200"></el-table-column>
          <el-table-column property="userId" label="联系方式" width="200"></el-table-column>
          <el-table-column property="articleId" label="文章">
            <template slot-scope="scope">
              <router-link
                :to="{path:'/changeArticleMain', query:{ articleId: scope.row.articleId }}"
                target="_blank"
              >
                <el-button
                  size="mini"
                  plain
                  type="primary"
                  @click="changeArticleMain(scope.$index, scope.row) "
                  style="margin-right:10px"
                >文章</el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getLikesFans } from "../request/api";
export default {
  data() {
    return {
      activeName: "first",
      tableData1: [],
      tableData2: [],
      currentRow: null
    };
  },

  components: {},

  computed: {},

  mounted() {
    getLikesFans()
      .then(res => {
        this.tableData1 = res.fans;
        this.tableData2 = res.likes;
      })
      .catch(res => {});
  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style>
</style>