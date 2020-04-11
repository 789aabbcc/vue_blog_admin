<!-- 技术标签管理 -->
<template>
  <div>
    <!-- 头部面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-bottom:20px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索区 -->
    <div style="margin-top: 15px;margin-bottom: 5px;">
      <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="请选择标签">
          <el-option
            v-for="(item,i) in types"
            :label="item.typeBig+'-'+item.typeName"
            :value="item.typeId"
            :key="i"
          ></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="findArticle"></el-button>
      </el-input>
    </div>

    <!-- 表单区Start -->
    <el-table ref="singleTable" :data="tableData" style="width: 100%">
      <el-table-column align="center" type="index"></el-table-column>
      <el-table-column align="center" property="title" label="文章标题" width="200">
        <template slot-scope="scope">
          <i style="color: #409EFF">{{ scope.row.title}}</i>
        </template>
      </el-table-column>
      <el-table-column align="center" property="type" label="分类（普通/福利）" width="150">
        <template slot-scope="scope">
          <i :style="scope.row.type=='普通'? 'color: #67C23A':'color:#E6A23C'">{{ scope.row.type}}</i>
        </template>
      </el-table-column>
      <el-table-column align="center" property="good" label="在首页显示" width="120"></el-table-column>

      <el-table-column align="center" property="types" label="分类" width="150">
        <template slot-scope="scope">
          <i style="color: #F56C6C">{{ scope.row.types}}</i>
        </template>
      </el-table-column>
      <el-table-column align="center" label="封面" width="80">
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
      <el-table-column align="center" property="updateAt" label="修改时间" width="180">
        <template slot-scope="scope">
          <i style="color: #67C23A">{{ scope.row.updateAt}}</i>
        </template>
      </el-table-column>
      <el-table-column align="center" property="numberSize" label="字数" width="80"></el-table-column>
      <el-table-column align="center" property="likes" label="喜欢数" width="80"></el-table-column>
      <el-table-column align="center" property="see" label="浏览量" width="80"></el-table-column>
      <el-table-column align="center" property="dsc" label="描述" width="200"></el-table-column>
      <el-table-column align="center" label="操作" fixed="right" width="220">
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

          <el-button
            size="mini"
            plain
            type="success"
            @click="handleEdit(scope.$index, scope.row) "
          >信息</el-button>
          <el-button
            size="mini"
            plain
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pageChange">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="this.nowPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="this.pageSize"
        layout="sizes, prev, pager, next"
        :total="this.total"
      ></el-pagination>
    </div>

    <!-- 表单区End -->

    <!-- 编辑弹出框Start -->
    <el-dialog title="修改文章基本内容" :visible.sync="editVisible" width="45%">
      <el-form ref="form" :inline="true" :model="form">
        <el-form-item label="封面">
          <img :src="form.cover" alt style="width:100px;height:60px;margin-left:50px" />
        </el-form-item>
        <el-form-item label="输入封面链接">
          <el-input v-model="form.cover"></el-input>
        </el-form-item>
        <el-form-item label="文章标题">
          <el-input v-model="form.title" style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="文章描述">
          <el-input v-model="form.dsc" style="width:500px"></el-input>
        </el-form-item>
        <br />
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

        <br />
        <el-form-item label="喜欢数：" label-width="formLabelWidth">
          <el-input v-model="form.likes" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="浏览量:">
          <el-input v-model="form.see" style="width:200px"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="字数:">
          <i style="color: #409EFF;margin-left:5px;">{{form.numberSize}}</i>
        </el-form-item>
        <el-form-item label="修改时间:" label-width="formLabelWidth" style="margin-left:100px;">
          <i style="color: #67C23A;margin-left:5px;">{{form.updateAt}}</i>
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
import {
  getAllTypes,
  getArticles,
  findArticles,
  changeArticles,
  deleteArticles
} from "../request/api";

export default {
  data() {
    return {
      // 搜索
      input: "",
      select: "",
      // 分页
      total: 0,
      nowPage: 1,
      pageSize: 5,
      // 内容
      tableData: [
        {
          articleId: "",
          title: "",
          content: "",
          cover: "",
          type: "",
          cover: "",
          updateAt: "",
          dsc: "",
          good: "",
          types: "",
          likes: "",
          see: "",
          numberSize: ""
        }
      ],
      types: [
        {
          typeId: "",
          typeBig: "",
          typeName: ""
        }
      ],
      currentRow: null,
      // 弹出编辑框
      editVisible: false,
      delVisible: false,
      // 编辑框内容
      id: -1,
      delTypes: "",
      form: {}
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

    // 获取文章
    getArticles({
      input: this.input,
      select: this.select,
      pageSize: this.pageSize,
      nowPage: this.nowPage
    })
      .then(res => {
        this.tableData = res.result;
        this.total = res.result1.count;
      })
      .catch(res => {});
  },

  methods: {
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      // 获取文章
      getArticles({
        input: this.input,
        select: this.select,
        pageSize: this.pageSize,
        nowPage: this.nowPage
      })
        .then(res => {
          this.tableData = res.result;
          this.total = res.result1.count;
        })
        .catch(res => {});
    },
    handleCurrentChange(val) {
      this.nowPage = val;
      // 获取文章
      getArticles({
        input: this.input,
        select: this.select,
        pageSize: this.pageSize,
        nowPage: this.nowPage
      })
        .then(res => {
          this.tableData = res.result;
          this.total = res.result1.count;
        })
        .catch(res => {});
    },

    // 弹出编辑框
    handleEdit(index, row) {
      this.id = row.articleId;
      this.delTypes = row.typeId;

      this.form = {
        articleId: row.articleId,
        title: row.title,
        content: row.content,
        cover: row.cover,
        type: row.type,
        cover: row.cover,
        updateAt: row.updateAt,
        dsc: row.dsc,
        good: row.good,
        types: row.typeId,
        likes: row.likes,
        see: row.see,
        numberSize: row.numberSize
      };
      this.editVisible = true;
    },

    // 保存编辑
    saveEdit() {
      this.editVisible = false;
      let info = {
        articleId: this.id,
        title: this.form.title,
        content: this.form.content,
        cover: this.form.cover,
        type: this.form.type,
        cover: this.form.cover,
        updateAt: this.form.updateAt,
        dsc: this.form.dsc,
        good: this.form.good,
        types: this.form.types,
        likes: this.form.likes,
        see: this.form.see,
        numberSize: this.form.numberSize,
        delTypes: this.delTypes
      };
      changeArticles(info)
        .then(res => {
          this.$message.success("修改成功");
          getArticles({
            input: this.input,
            select: this.select,
            pageSize: this.pageSize,
            nowPage: this.nowPage
          })
            .then(res => {
              this.tableData = res.result;
              this.total = res.result1.count;
            })
            .catch(res => {});
        })
        .catch(res => {});
    },

    //弹出删除框
    handleDelete(index, row) {
      this.id = row.articleId;
      this.delTypes = row.typeId;
      this.delVisible = true;
    },

    // 确定删除
    deleteRow() {
      deleteArticles({ articleId: this.id, delTypes: this.delTypes })
        .then(res => {
          this.$message.success("删除成功");
          this.delVisible = false;

          if ((this.total - 1) % 5 == 0) {
            this.total = this.total - 1;
            this.nowPage = this.nowPage - 1;
            getArticles({
              input: this.input,
              select: this.select,
              pageSize: this.pageSize,
              nowPage: this.nowPage
            })
              .then(res => {
                this.tableData = res.result;
                this.total = res.result1.count;
              })
              .catch(res => {});
          } else {
            this.total = this.total - 1;

            getArticles({
              input: this.input,
              select: this.select,
              pageSize: this.pageSize,
              nowPage: this.nowPage
            })
              .then(res => {
                this.tableData = res.result;
                this.total = res.result1.count;
              })
              .catch(res => {});
          }
        })
        .catch(res => {
          this.$message.error("请求失败");
        });
    },

    // 搜索
    findArticle() {
      getArticles({
        input: this.input,
        select: this.select,
        pageSize: this.pageSize,
        nowPage: this.nowPage
      })
        .then(res => {
          this.tableData = res.result;
          this.total = res.result1.count;
        })
        .catch(res => {});
    }
  }
};
</script>
<style>
.pageChange {
  float: right;
  margin: 30px 200px 30px;
}

.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>