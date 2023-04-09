<template>
  <p class="login1">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="登录" name="first">
        <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef" label-width="100px" class="demo-loginForm"
          @keyup.enter.native="submitForm">
          <el-form-item label="邮箱" prop="Email" class="item">
            <el-input v-model="loginForm.Email" ref="emailInput"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="Password" class="item">
            <el-input type="password" v-model="loginForm.Password" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm">登录</el-button>

            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="注册" name="second">
        <register @close="close()"></register>
      </el-tab-pane>

      <el-tab-pane label="找回密码">
        <findPass @close="close()"></findPass>
      </el-tab-pane>
      <el-tab-pane disabled></el-tab-pane>
      <el-tab-pane disabled></el-tab-pane>
      <el-tab-pane disabled></el-tab-pane>
      <el-tab-pane name="close">
        <span slot="label"><i class="el-icon-close"></i></span>
      </el-tab-pane>
    </el-tabs>
  </p>
</template>

<script>
import register from './register'
import findPass from './findPass'
import { login } from '@/api/login.js'

export default {
  mounted() {
    this.$nextTick(() => {
      this.$refs.emailInput.focus();
    });
  },
  data() {
    let checkEmail = (rule, value, cb) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }

    return {
      activeName: 'first',
      //  这是登入表单的数据绑定对象
      loginForm: {
        Email: '20zhzhang@stu.edu.cn',
        Password: '123456',
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        Email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' },
        ],
        // 验证密码是否合法
        Password: [
          { required: true, message: '请输入登入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },

  methods: {
    //选项卡切换
    handleClick(tab) {
      if (tab.name === 'close') {
        this.$emit('close')
      }
    },
    close() {
      this.$emit('close')
    },
    //重置表单
    resetForm() {
      this.$refs.loginFormRef.resetFields()
    },
    //提交表单
    submitForm() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return this.$message.error('格式不正确')
        const res = await login(this.loginForm)
        if (res.code !== 200) return this.$message.error(res.msg)
        window.localStorage.setItem('token', res.data.token)
        window.localStorage.setItem('tokenStartTime', new Date().getTime())
        this.$emit('close')
        this.$store.commit('changeLogin', true)
        return this.$message({
          duration: 1000,
          message: res.msg,
          type: 'success',
        })
      })
    },
  },
  components: {
    register,
    findPass,
  },
}
</script>

<style lang="scss" scoped>
.login1 {
  @include abs-center;
  width: 380px;
  margin: auto auto;
}

.el-tabsitem {
  text-align: center;
  width: 60px;
}

.item .el-form-item__label {
  font-weight: 600;
}
</style>