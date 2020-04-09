<!-- 增加标签 -->
<template>
  <div>
    <!-- 头部面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-bottom:20px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>标签列表</el-breadcrumb-item>
      <el-breadcrumb-item>增加标签</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 增加标签 -->
    <el-form ref="form" :model="form" label-width="120px" :rules="rules">
      <el-form-item label="封面">
        <div style="width:100px;height:100px;">
          <div class="demo-image__preview">
            <el-image
              style="width: 100px; height: 100px"
              :src="form.cover"
              :preview-src-list="[form.cover]"
            ></el-image>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="输入封面链接" prop="cover">
        <el-input v-model="form.cover" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item label="类型名字" prop="typeName">
        <el-input v-model="form.typeName" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item label="技术/生活" prop="typeBig">
        <el-select
          label="类型名字"
          v-model="form.typeBig"
          placeholder="请选择类型typeBig"
          style="width:400px"
        >
          <el-option label="技术分享" value="技术分享" name="typeBig"></el-option>
          <el-option label="生活随笔" value="生活随笔" name="typeBig"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="分类Class" prop="typeClass">
        <el-select
          label="类型名字"
          v-model="form.typeClass"
          placeholder="请选择类型Class"
          style="width:400px"
        >
          <el-option label="tecSmall" value="tecSmall" name="typeClass"></el-option>
          <el-option label="tecNormal" value="tecNormal" name="typeClass"></el-option>
          <el-option label="tecBig" value="tecBig" name="typeClass"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addTypes } from "../request/api";
export default {
  data() {
    return {
      form: {
        cover: "",
        typeName: "",
        typeBig: "",
        typeClass: ""
      },
      rules: {
        cover: [{ required: true, message: "请输入图片链接", trigger: "blur" }],
        typeName: [
          { required: true, message: "请输入类型名称", trigger: "blur" }
        ],
        typeBig: [
          { required: true, message: "请选择typeBig", trigger: "change" }
        ],
        typeClass: [
          { required: true, message: "请选择typeClass", trigger: "change" }
        ]
      }
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addTypes(this.form)
            .then(res => {
              this.$message.success("添加成功");
            })
            .catch(res => {});
        } else {
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style>
</style>