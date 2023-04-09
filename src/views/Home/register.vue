<!-- register组件 -->
<template>
  <el-form :model="enrollForm" :rules="enrollFormRules" ref="enrollFormref" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="Name" class="item">
      <el-input v-model="enrollForm.Name"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="Password" class="item">
      <el-input type="password" v-model="enrollForm.Password" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="Email" class="item1">
      <el-input v-model="enrollForm.Email" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="Verify" class="item1">
      <el-input v-model="enrollForm.Verify" type="number" oninput="if(value.length>6)value=value.slice(0,6)"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">注册</el-button>
      <el-button @click="resetForm">重置</el-button>
      <el-button type="warning" @click="getVerifyCode">获取验证码</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { getcode } from '@/api/login.js'
  import { regist } from '@/api/login.js'

  export default {
    data() {
      let checkEmail = (rule, value, cb) => {
        const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
        if (regEmail.test(value)) {
          return cb()
        }
        cb(new Error('请输入合法的邮箱'))
      }
      return {
        timer: '',
        codeNum: '',
        flag: true,
        curTime: Date.now(),
        enrollForm: {
          Name: '',
          Password: '',
          Email: '20zhzhang@stu.edu.cn',
          Verify: '',
        },
        enrollFormRules: {
          Name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            {
              min: 3,
              max: 10,
              message: '用户名的长度在3~10个字符之间',
              trigger: 'blur',
            },
          ],
          Password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            {
              min: 6,
              max: 15,
              message: '用户名的长度在6~15个字符之间',
              trigger: 'blur',
            },
          ],
          Email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { validator: checkEmail, trigger: 'blur' },
          ],
          Verify: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
        },
      };
    },

    methods: {
      submitForm() {
        this.$refs.enrollFormref.validate(async (valid) => {
          if (!valid) return this.$message.error('格式不正确')
          const res = await regist(this.enrollForm)
          if (res.code !== 200) return this.$message.error(res.msg)
          if (res.code === 200) {
            window.localStorage.setItem('token', res.data.token)
            window.localStorage.setItem('tokenStartTime', new Date().getTime())
            this.$emit('close')
            this.$store.commit('changeLogin', true)
            return this.$message.success(res.msg)
          }
        });
      },

      getTime() {
        this.timer && clearTimeout(this.timer)
        // 新增代码：
        const now = Date.now();
        const diffTime = Math.floor((now - this.curTime) / 1000);
        this.curTime = now;
        this.codeNum -= diffTime
        if (this.codeNum < 0) return this.flag = true
        this.timer = setTimeout(() => {
          this.getTime();
        }, 1000)
      },
      async getVerifyCode() {
        if (!this.flag) return this.$message.error('请等待三十秒再发送验证码')
        this.codeNum = 30
        this.flag = false
        this.getTime()
        // 检验邮箱之后再发验证码
        const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
        if (!regEmail.test(this.enrollForm.Email)) {
          return this.$message.error('该邮箱格式不正确！')
        }
        const res = await getcode(this.enrollForm.Email)
        if (res.code === 201) return this.$message.error('该邮箱已经被注册！')
        if (res.code === 200) return this.$message.success('发送验证码成功！')
      },

      resetForm() {
        this.$refs.enrollFormref.resetFields()
      }
    }
  };
</script>

<style>
  .item1 .el-form-item__label {
    font-weight: 600;
    color: #222;
  }
</style>