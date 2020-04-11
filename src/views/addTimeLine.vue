<!-- 新增时光轴 -->
<!-- 新增文章 -->
<template>
  <div>
    <div style="width:60%;margin:0 auto;">
      <el-form ref="form" :inline="true" :model="form">
        <el-form-item label="标题">
          <el-input v-model="form.title" style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-input v-model="form.time" style="width:500px"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="年">
          <el-input v-model="form.year" style="width:120px;margin-left:14px"></el-input>
        </el-form-item>
        <el-form-item label="月-日">
          <el-input v-model="form.date" style="width:120px"></el-input>
        </el-form-item>

        <el-form-item label="type">
          <el-select label="type" v-model="form.type" placeholder="请选择type" style="width:120px">
            <el-option label="info" value="info"></el-option>
            <el-option label="danger" value="danger"></el-option>
            <el-option label="success" value="success"></el-option>
            <el-option label="warning" value="warning"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="内容:" label-width="formLabelWidth" style="width:400px">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 14}"
            v-model="form.main"
            style="width:500px;margin-left:40px"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button>取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </div>
  </div>
</template>

<script>
import { addTimeLine } from "../request/api";

export default {
  data() {
    return {
      form: {
        time: "",
        main: "",
        cover: "",
        year: "",
        date: "",
        type: "",
        title: ""
      }
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    add() {
      let article = this.form;
      addTimeLine(article)
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