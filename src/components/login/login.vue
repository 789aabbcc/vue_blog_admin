<!-- 后台管理系统 登陆模块 -->
<template>
  <div>
    <div id="container">
      <div id="output">
        <div class="containerT">
          <h1>好一只帅卤蛋的blog登录</h1>
          <form class="form" id="entry_form">
            <input type="text" placeholder="用户名" id="entry_name" value="admin" v-model="username" />
            <input type="password" placeholder="密码" id="entry_password" v-model="password" />
            <button type="button" id="entry_btn" @click="click()">登录</button>
            <div id="prompt" class="prompt"></div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
* {
  margin: 0;
  padding: 0;
  /* font-size: 13px; */
  font-family: microsoft yahei;
}
html,
body {
  width: 100%;
  height: 100%;
  background: #fff;
}

#container {
  background: url("./bgi1.jpg");
  background-size: cover;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
#output {
  width: 100%;
  height: 100%;
}
.prompt {
  width: 60%;
  height: 30px;
  margin: 5px auto;
  text-align: center;
  line-height: 30px;
  font-family: microsoft yahei, Arial, sans-serif;
  font-size: 13px;
  color: #df0000;
}
.containerT {
  width: 400px;
  height: 300px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -150px 0 0 -200px;
  border-radius: 3px;
}
.containerT h1 {
  font-size: 18px;
  font-family: microsoft yahei, Arial, sans-serif;
  -webkit-transition-duration: 1s;
  transition-duration: 1s;
  -webkit-transition-timing-function: ease-in-put;
  transition-timing-function: ease-in-put;
  font-weight: 500;
}
form {
  padding: 20px 0;
  position: relative;
  z-index: 2;
}
form input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: 0;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background-color: rgba(255, 255, 255, 0.2);
  width: 200px;
  border-radius: 3px;
  padding: 8px 15px;
  margin: 0 auto 10px;
  display: block;
  text-align: center;
  font-size: 15px;
  color: #fff;
  -webkit-transition-duration: 0.25s;
  transition-duration: 0.25s;
  font-weight: 300;
}
form input:hover {
  background-color: rgba(255, 255, 255, 0.4);
}
form input:focus {
  background-color: #fff;
  width: 230px;
  color: #333;
}
form button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: 0;
  background-color: #fff;
  border: 0;
  padding: 10px 15px;
  color: #333;
  border-radius: 3px;
  width: 200px;
  cursor: pointer;
  font-family: microsoft yahei, Arial, sans-serif;
  font-size: 16px;
  font-weight: 700;
  -webkit-transition-duration: 0.25s;
  transition-duration: 0.25s;
}
form button:hover {
  background-color: #f5f7f9;
}
</style>


<script>
import { login } from "../../request/api";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    ...mapMutations(["changeLogin"]),
    open1() {
      this.$message({
        message: "恭喜你，登陆成功",
        type: "success"
      });
    },

    open2() {
      this.$message({
        message: "请输入用户名和密码",
        type: "warning"
      });
    },

    open3() {
      this.$message.error("登陆失败，用户名或密码错误");
    },
    open4() {
      this.$message.error("登陆失败");
    },
    open5() {
      this.$message.error("登陆失败，没有这个用户哟");
    },
    click() {
      let _this = this;
      if (!this.username || !this.password) {
        this.open2();
      } else {
        login({
          username: this.username,
          password: this.password
        })
          .then(res => {
            if (res.code == 0) {
              _this.userToken = res.access_token;
              _this.changeLogin({ Authorization: _this.userToken });
              this.open1();
              this.$router.push({ path: "/" });
            } else if (res.code == 1) {
              this.open5();
            } else if (res.code == 2) {
              this.open3();
            } else {
              this.open4();
            }
          })
          .catch(res => {
            alert(res);
          });
      }
    }
  }
};
</script>
<style>
</style>