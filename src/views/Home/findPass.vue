<template>
  <el-form :model="findPasswordForm" :rules="findPasswordFormRules" ref="findPasswordFormRef" label-width="100px"
    class="demo-ruleForm">
    <el-form-item label="邮箱" prop="Email" class="item">
      <el-input v-model="findPasswordForm.Email"></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="Verify" class="item1">
      <el-input type="number" oninput="if(value.length>6)value=value.slice(0,6)" v-model="findPasswordForm.Verify">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="resetForm">重置</el-button>
      <el-button type="warning" @click="getVerifyCode">验证码</el-button>
      <el-button type="warning" @click="submitForm">找回密码</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { getcode } from '@/api/login.js'
  import { findPass } from '@/api/login.js'

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
        findPasswordForm: {
          Email: '2078048816@qq.com',
          Verify: '',
        },
        findPasswordFormRules: {
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
        this.$refs.findPasswordFormRef.validate(async (valid) => {
          if (!valid) return this.$message.error('格式不正确')
          const res = await findPass(this.findPasswordForm)
          if (res.code !== 200) return this.$message.error(res.msg)
          if (res.code === 200) return this.$message.success(res.msg)
        });
      },

      async getVerifyCode() {
        if (!this.flag) return this.$message.error('请等待三十秒再发送验证码')
        this.codeNum = 30
        this.flag = false
        this.getTime()
        // 检验邮箱之后再发验证码
        const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
        if (!regEmail.test(this.findPasswordForm.Email)) {
          return this.$message.error('该邮箱格式不正确！')
        }
        const res = await getcode(this.findPasswordForm.Email)
        if (res.code !== 200) return this.$message.error(res.msg)
        if (res.code === 200) return this.$message.success(res.msg)
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
      resetForm() {
        this.$refs.findPasswordFormRef.resetFields()
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