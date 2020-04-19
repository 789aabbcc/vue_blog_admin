<!-- 图集介绍管理 -->

<template>
  <div>
    <!-- 头部面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-bottom:20px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>项目图集管理</el-breadcrumb-item>
      <el-breadcrumb-item>图集列表</el-breadcrumb-item>
      <el-breadcrumb-item>
        图集总数：
        <i style="color: #F56C6C">{{this.total}}</i>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 表单区Start -->
    <el-table ref="singleTable" :data="form" style="width: 100%">
      <el-table-column align="center" type="index"></el-table-column>
      <el-table-column align="center" property="name" label="图集名称" width="160">
        <template slot-scope="scope">
          <i style="color: #409EFF">{{ scope.row.name}}</i>
        </template>
      </el-table-column>
      <el-table-column align="center" label="封面" width="140">
        <template slot-scope="scope">
          <div class="demo-image__preview">
            <el-image
              style="width: 40px; height: 40px"
              :src="scope.row.cover"
              :preview-src-list="[scope.row.cover]"
            ></el-image>
          </div>
        </template>
      </el-table-column>

      <el-table-column align="center" property="updateAt" label="修改时间" width="220">
        <template slot-scope="scope">
          <i style="color: #67C23A">{{ scope.row.updateAt}}</i>
        </template>
      </el-table-column>
      <el-table-column align="center" property="content" label="图集介绍">
        <template slot-scope="scope">
          <i style="color: #409EFF">{{ scope.row.content}}</i>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <router-link
            :to="{path:'/projectMain', query:{ projectId: scope.row.projectId }}"
            target="_blank"
          >
            <el-button size="mini" plain type="primary" style="margin-right:10px">图集</el-button>
          </router-link>

          <el-button
            size="mini"
            plain
            type="success"
            @click="handleEdit(scope.$index, scope.row) "
          >编辑</el-button>
          <el-button
            size="mini"
            plain
            type="danger"
            @click="handleDelete(scope.$index, scope.row) "
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 表单区End -->

    <!-- 编辑弹出框Start -->
    <el-dialog title="修改项目基本内容" :visible.sync="editVisible" width="45%">
      <el-form ref="formChange" :inline="true" :model="formChange">
        <el-form-item label="封面">
          <img :src="formChange.cover" alt style="width:100px;height:60px;margin-left:50px" />
        </el-form-item>
        <el-form-item label="输入封面链接">
          <el-input v-model="formChange.cover"></el-input>
        </el-form-item>
        <el-form-item label="图集名称">
          <el-input v-model="formChange.name" style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="图集介绍">
          <el-input v-model="formChange.content" style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="图集" style="display:block;">
          <div class="demo-image__preview">
            <el-image
              style="width: 40px; height: 40px;margin-right:5px"
              v-for="(item,i) in img"
              :key="i"
              :src="item"
              :preview-src-list="[item]"
            ></el-image>
            <div v-for="(item,i) in img" :key="i">{{item}}</div>
          </div>
        </el-form-item>

        <el-form-item label="修改时间:" label-width="formLabelWidth" style="margin-left:100px;">
          <i style="color: #67C23A;margin-left:5px;">{{formChange.updateAt}}</i>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑弹出框End -->

    <!-- 删除提示框Start -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除提示框End -->
  </div>
</template>

<script>
import { getProjects, changeProjects, deleteProjects } from "../request/api";

export default {
  data() {
    return {
      form: {},
      total: 0,
      img: [],
      formChange: {},
      id: 0,
      editVisible: false,
      delVisible: false
    };
  },

  components: {},

  computed: {},

  mounted() {
    // 获取项目
    getProjects({ type: "图集" })
      .then(res => {
        this.form = res.result;
        this.total = res.count.count;
        this.img = res.result.main.split(",");
      })
      .catch(res => {});
  },

  methods: {
    // 弹出编辑框
    handleEdit(index, row) {
      this.id = row.projectId;
      this.img = row.main.split(",");
      this.formChange = {
        projectId: row.projectId,
        name: row.name,
        times: row.times,
        cover: row.cover,
        content: row.content,
        updateAt: row.updateAt,
        main: row.main
      };

      this.editVisible = true;
    },

    // 保存编辑
    saveEdit() {
      this.editVisible = false;
      let info = {
        projectId: this.id,
        name: this.formChange.name,
        times: this.formChange.times,
        cover: this.formChange.cover,
        content: this.formChange.content
      };
      changeProjects(info)
        .then(res => {
          this.$message.success("修改成功！");
          // 获取项目
          getProjects({ type: "图集" })
            .then(res => {
              this.form = res.result;
              this.total = res.count.count;
              this.img = res.result[0].main.split(",");
            })
            .catch(res => {});
        })
        .catch(res => {
          this.$message.error("修改失败！");
        });
    },

    //弹出删除框
    handleDelete(index, row) {
      this.id = row.projectId;
      this.delVisible = true;
    },

    // 确定删除
    deleteRow() {
      deleteProjects({ projectId: this.id })
        .then(res => {
          this.$message.success("删除成功！");
          this.delVisible = false;
          // 获取项目
          getProjects({ type: "图集" })
            .then(res => {
              this.form = res.result;
              this.total = res.count.count;
              this.img = res.result[0].main.split(",");
            })
            .catch(res => {});
        })
        .catch(res => {
          this.$message.error("删除失败！");
        });
    }
  }
};
</script>
<style>
.pageChange {
  float: right;
  margin-top: 20px;
  margin-right: 100px;
}
</style>