<!-- 技术标签管理 -->
<template>
  <div>
    <!-- 头部面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-bottom:20px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>标签列表</el-breadcrumb-item>
      <el-breadcrumb-item>技术标签</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 表单区Start -->
    <el-table ref="singleTable" :data="tableData" style="width: 100%">
      <el-table-column align="center" type="index"></el-table-column>
      <el-table-column align="center" property="typeName" label="类型名字" width="160"></el-table-column>
      <el-table-column align="center" property="typeClass" label="类型Class" width="160"></el-table-column>
      <el-table-column align="center" property="articles" label="收录文章数" width="120">
        <template slot-scope="scope">
          <i style="color: #409EFF">{{ scope.row.articles}}</i>
        </template>
      </el-table-column>
      <el-table-column align="center" property="likes" label="收获喜欢" width="120">
        <template slot-scope="scope">
          <i style="color: #F56C6C">{{ scope.row.likes}}</i>
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
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
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
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pageChange">
      <el-pagination
        background
        :page-size="5"
        layout="prev, pager, next"
        :total="this.total"
        :hide-on-single-page="true"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>

    <!-- 表单区End -->

    <!-- 编辑弹出框Start -->
    <el-dialog title="修改标签内容" :visible.sync="editVisible" width="40%">
      <el-form ref="form" :inline="true" :model="form">
        <el-form-item label="封面">
          <img :src="form.cover" alt style="width:60px;height:60px;margin-left:50px" />
        </el-form-item>
        <el-form-item label="输入封面链接">
          <el-input v-model="form.cover"></el-input>
        </el-form-item>
        <el-form-item label="类型名字">
          <el-input v-model="form.typeName" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="类型Class">
          <el-select
            label="类型名字"
            v-model="form.typeClass"
            placeholder="请选择类型Class"
            style="width:120px"
          >
            <el-option label="tecSmall" value="tecSmall"></el-option>
            <el-option label="tecNormal" value="tecNormal"></el-option>
            <el-option label="tecBig" value="tecBig"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="收获喜欢" label-width="formLabelWidth">
          <el-input v-model="form.likes" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="收录文章数:">
          <i style="color: #409EFF;margin-left:5px;">{{form.articles}}</i>
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
  getTypes,
  getTypesCount,
  changeTypes,
  deleteTypes
} from "../request/api";

export default {
  data() {
    return {
      total: 0,
      nowPage: 1,
      tableData: [
        {
          typeId: "",
          typeName: "",
          typeClass: "",
          cover: "",
          updateAt: "",
          articles: 0,
          likes: 0
        }
      ],
      currentRow: null,
      // 弹出编辑框
      editVisible: false,
      delVisible: false,
      id: -1,
      form: {}
    };
  },

  components: {},

  computed: {},

  mounted() {
    // 获取标签总数
    getTypesCount({ typeBig: "技术分享" })
      .then(res => {
        this.total = res.result.count;
      })
      .catch(res => {
        this.$message.error("请求失败");
      });
    // 获取标签内容
    getTypes({ typeBig: "技术分享", nowPage: this.nowPage })
      .then(res => {
        this.tableData = res.result;
      })
      .catch(res => {
        this.$message.error("请求失败");
      });
  },

  methods: {
    // 分页
    handleCurrentChange(val) {
      this.nowPage = val;
      getTypes({ typeBig: "技术分享", nowPage: this.nowPage })
        .then(res => {
          this.tableData = res.result;
        })
        .catch(res => {
          this.$message.error("请求失败");
        });
    },

    // 弹出编辑框
    handleEdit(index, row) {
      this.id = row.typeId;

      this.form = {
        typeId: row.typeId,
        typeName: row.typeName,
        typeClass: row.typeClass,
        cover: row.cover,
        articles: row.articles,
        likes: row.likes,
        updateAt: row.updateAt
      };
      this.editVisible = true;
    },

    // 保存编辑
    saveEdit() {
      this.editVisible = false;

      let info = {
        typeId: this.id,
        typeName: this.form.typeName,
        typeClass: this.form.typeClass,
        cover: this.form.cover,
        likes: this.form.likes
      };
      changeTypes(info)
        .then(res => {
          this.$message.success("修改成功");
          getTypes({ typeBig: "技术分享", nowPage: this.nowPage })
            .then(res => {
              this.tableData = res.result;
            })
            .catch(res => {
              this.$message.error("请求失败");
            });
        })
        .catch(res => {
          this.$message.error("请求失败");
        });
    },

    //弹出删除框
    handleDelete(index, row) {
      this.id = row.typeId;
      this.delVisible = true;
    }, // 确定删除

    deleteRow() {
      deleteTypes({ typeId: this.id })
        .then(res => {
          this.$message.success("删除成功");
          this.delVisible = false;

          if ((this.total - 1) % 5 == 0) {
            this.total = this.total - 1;
            getTypes({ typeBig: "技术分享", nowPage: this.nowPage - 1 })
              .then(res => {
                this.tableData = res.result;
              })
              .catch(res => {
                this.$message.error("请求失败");
              });
          } else {
            this.total = this.total - 1;
            getTypes({ typeBig: "技术分享", nowPage: this.nowPage })
              .then(res => {
                this.tableData = res.result;
              })
              .catch(res => {
                this.$message.error("请求失败");
              });
          }
        })
        .catch(res => {
          this.$message.error("请求失败");
        });
    }
  }
};
</script>
<style>
.pageChange {
  float: right;
  margin: 30px 200px 30px;
}
</style>