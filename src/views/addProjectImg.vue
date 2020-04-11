<!-- 新增项目图集 -->
<template>
  <div>
    <!-- 头部面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-bottom:20px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>项目列表</el-breadcrumb-item>
      <el-breadcrumb-item>新增项目图集</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="width:60%;margin:0 auto;">
      <el-form ref="form" :model="form">
        <el-form-item label="封面">
          <img :src="form.cover" alt style="width:100px;height:60px;margin-left:50px" />
        </el-form-item>
        <el-form-item label="输入封面链接">
          <el-input placeholder="请输入封面链接" v-model="form.cover"></el-input>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input placeholder="请输入项目名称" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="项目周期">
          <el-input placeholder="请输入项目周期" v-model="form.times"></el-input>
        </el-form-item>
        <el-form-item label="项目介绍">
          <el-input type="textarea" :rows="2" placeholder="请输入项目介绍" v-model="form.content"></el-input>
        </el-form-item>

        <el-form-item label="项目类型项目/图集">
          <el-select label="项目类型项目/图集" v-model="form.type" placeholder="分类" style="width:130px">
            <el-option label="项目" value="项目"></el-option>
            <el-option label="图集" value="图集"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" style="float:right">
        <el-button>取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </div>
  </div>
</template>

<script>
import { addProjects } from "../request/api";

export default {
  data() {
    return {
      form: {
        name: "",
        content: "",
        cover: "",
        type: "",
        times: ""
      }
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    add() {
      let article = this.form;
      addProjects(article)
        .then(res => {
          this.$message.success("增加成功！");
        })
        .catch(res => {});
    }
  }
};
</script>
<style>
</style>