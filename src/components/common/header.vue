<!-- 所有页面的头部 -->
<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <img src="../../assets/images/卤蛋.png" style="width:160px; height:60px;" alt />
    </div>

    <div class="header-right">
      <div class="header-user-con">
        <!-- 时间显示 -->
        <div id="time">
          <div class="el-icon-time" style="display:inline-block;"></div>
          <div id="hour" style="display:inline-block;">{{this.hour}}</div>
        </div>

        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="../../assets/images/avatar1.jpg" />
        </div>

        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{name}}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <a href="https://github.com/789aabbcc" target="_blank">
              <el-dropdown-item>项目仓库</el-dropdown-item>
            </a>
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import bus from "./bus";
export default {
  data() {
    return {
      hour: "",
      collapse: false,
      fullscreen: false,
      name: "好一只帅卤蛋",
      message: 1
    };
  },

  methods: {
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == "loginout") {
        localStorage.removeItem("Authorization");
        this.$router.push("/login");
      }
    },
    // 侧边栏折叠
    collapseChage() {
      this.collapse = !this.collapse;
      bus.$emit("collapse", this.collapse);
    },

    p(s) {
      return s < 10 ? "0" + s : s;
    },
    nowtime() {
      var myDate = new Date();
      var h = myDate.getHours(); //获取当前小时数(0-23)
      var m = myDate.getMinutes(); //获取当前分钟数(0-59)
      var s = myDate.getSeconds();
      var hour = this.p(h) + ":" + this.p(m) + ":" + this.p(s);
      this.hour = hour;
    }
  },

  mounted() {
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
  },
  watch: {
    hour: {
      handler(newName, oldName) {
        setInterval(this.nowtime, 0);
      },
      deep: true,
      immediate: true
    }
  }
};
</script>


<style scoped>
#time {
  float: right;
  width: auto;
  padding: 0 50px;
  margin-left: 40px;
  color: #fff;
  cursor: default;
  text-align: center;
}
#hour {
  display: block;
  width: auto;
  font-size: 22px;
  height: 34px;
  line-height: 34px;
  color: #fff;
  cursor: default;
}
#data {
  display: block;
  width: auto;
  font-size: 10px;
  height: 20px;
  line-height: 20px;
  color: #fff;
  cursor: default;
}

.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  font-size: 22px;
  color: #fff;
}
.collapse-btn {
  float: left;
  padding: 0 20px;
  cursor: pointer;
  line-height: 60px;
}

.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 60px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
  margin-right: 10px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
.sidebar .sidebar-el-menu {
  width: 200px;
}
</style>
