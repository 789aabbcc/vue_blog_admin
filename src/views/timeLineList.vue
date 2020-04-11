<!-- 时光轴管理 -->
<template>
  <div>
    <!-- 头部面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-bottom:20px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>时光轴管理</el-breadcrumb-item>
      <el-breadcrumb-item>时光轴列表</el-breadcrumb-item>
      <el-breadcrumb-item>
        时光轴总数：
        <i>{{this.total}}</i>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 表单区Start -->
    <el-table ref="singleTable" :data="tableData" style="width: 100%">
      <el-table-column align="center" type="index"></el-table-column>
      <el-table-column align="center" property="title" label="标题" width="160">
        <template slot-scope="scope">
          <i style="color:#409EFF">{{ scope.row.title}}</i>
        </template>
      </el-table-column>
      <el-table-column align="center" property="time" label="时间" width="160"></el-table-column>

      <el-table-column align="center" property="year" label="年" width="80">
        <template slot-scope="scope">
          <i style="color: #F56C6C">{{ scope.row.year}}</i>
        </template>
      </el-table-column>
      <el-table-column align="center" property="date" label="月-日" width="80">
        <template slot-scope="scope">
          <i style="color: #E6A23C">{{ scope.row.date}}</i>
        </template>
      </el-table-column>

      <el-table-column align="center" property="type" label="类型" width="120">
        <template slot-scope="scope">
          <i style="color: #67C23A">{{ scope.row.type}}</i>
        </template>
      </el-table-column>

      <el-table-column align="center" property="updateAt" label="修改时间" width="180">
        <template slot-scope="scope">
          <i style="color: #409EFF">{{ scope.row.updateAt}}</i>
        </template>
      </el-table-column>
      <el-table-column align="center" property="main" label="内容"></el-table-column>
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
    <el-dialog title="修改时光轴内容" :visible.sync="editVisible" width="40%">
      <el-form ref="form" :inline="true" :model="form">
        <el-form-item label="标题">
          <el-input v-model="form.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-input v-model="form.time" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="年">
          <el-input v-model="form.year" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="月-日">
          <el-input v-model="form.date" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="type">
          <el-select label="type" v-model="form.type" placeholder="请选择type" style="width:120px">
            <el-option label="info" value="info"></el-option>
            <el-option label="danger" value="danger"></el-option>
            <el-option label="success" value="success"></el-option>
            <el-option label="warning" value="warning"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="内容" label-width="formLabelWidth" style="width:400px">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 14}"
            v-model="form.main"
            style="width:500px"
          ></el-input>
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
  getTimeline,
  changeTimeLine,
  deleteTimeLine,
  getTimeLineTotal
} from "../request/api";

export default {
  data() {
    return {
      total: 0,
      nowPage: 1,
      tableData: [],
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
    // 获取时光轴内容
    getTimeline({ OFFSET: this.nowPage })
      .then(res => {
        this.tableData = res.timeLine;
      })
      .catch(res => {
        this.$message.error("请求失败");
      });
    // 获取内容总数
    getTimeLineTotal()
      .then(res => {
        this.total = res.total.count;
      })
      .catch(res => {});
  },

  methods: {
    // 分页
    handleCurrentChange(val) {
      this.nowPage = val;
      getTimeline({ OFFSET: this.nowPage })
        .then(res => {
          this.tableData = res.timeLine;
        })
        .catch(res => {
          this.$message.error("请求失败");
        });
    },

    // 弹出编辑框
    handleEdit(index, row) {
      this.id = row.timeLineId;

      this.form = {
        timeLineId: row.timeLineId,
        time: row.time,
        main: row.main,
        cover: row.cover,
        year: row.year,
        date: row.date,
        type: row.type,
        title: row.title,
        updateAt: row.updateAt
      };
      this.editVisible = true;
    },

    // 保存编辑
    saveEdit() {
      this.editVisible = false;

      let info = {
        timeLineId: this.form.timeLineId,
        time: this.form.time,
        main: this.form.main,
        cover: this.form.cover,
        year: this.form.year,
        date: this.form.date,
        type: this.form.type,
        title: this.form.title
      };
      changeTimeLine(info)
        .then(res => {
          this.$message.success("修改成功");
          getTimeline({ OFFSET: this.nowPage })
            .then(res => {
              this.tableData = res.timeLine;
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
      this.id = row.timeLineId;
      this.delVisible = true;
    }, // 确定删除

    deleteRow() {
      deleteTimeLine({ timeLineId: this.id })
        .then(res => {
          this.$message.success("删除成功");
          this.delVisible = false;

          if ((this.total - 1) % 5 == 0) {
            this.total = this.total - 1;
            this.nowPage = this.nowPage - 1;
            getTimeline({ OFFSET: this.nowPage })
              .then(res => {
                this.tableData = res.timeLine;
              })
              .catch(res => {
                this.$message.error("请求失败");
              });
          } else {
            this.total = this.total - 1;
            getTimeline({ OFFSET: this.nowPage })
              .then(res => {
                this.tableData = res.timeLine;
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