<!-- 新增文章 -->
<template>
  <div>
    <div style="width:60%;margin:0 auto;">
      <el-form ref="form" :model="form">
        <el-form-item label="封面">
          <img :src="form.cover" alt style="width:100px;height:60px;margin-left:50px" />
        </el-form-item>
        <el-form-item label="输入封面链接">
          <el-input v-model="form.cover"></el-input>
        </el-form-item>
        <el-form-item label="文章标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="文章描述">
          <el-input type="textarea" :rows="2" placeholder="请输入文章描述" v-model="form.dsc"></el-input>
        </el-form-item>
      </el-form>
      <el-form ref="form" :inline="true" :model="form">
        <el-form-item label="标签：">
          <el-select label="标签：" v-model="form.types" placeholder="分类" style="width:120px">
            <el-option
              v-for="(item,i) in types"
              :label="item.typeBig+'-'+item.typeName"
              :value="item.typeId"
              :key="i"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="（普通/福利）">
          <el-select label="分类（普通/福利）" v-model="form.type" placeholder="分类" style="width:130px">
            <el-option label="普通" value="普通"></el-option>
            <el-option label="福利" value="福利"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="首页显示">
          <el-select label="首页" v-model="form.good" placeholder="首页" style="width:100px;">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
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
import { getAllTypes, addArticles } from "../request/api";

export default {
  data() {
    return {
      form: {
        title: "",
        content: "",
        cover: "",
        type: "",
        dsc: "",
        good: "",
        types: ""
      },
      types: [
        {
          typeId: "",
          typeBig: "",
          typeName: ""
        }
      ]
    };
  },

  components: {},

  computed: {},

  mounted() {
    // 获取标签
    getAllTypes()
      .then(res => {
        this.types = res.result;
      })
      .catch(res => {});
  },

  methods: {
    add() {
      let article = this.form;
      addArticles(article)
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