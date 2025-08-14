<template>
  <div class="login-container">
    <!-- 顶部导航 -->
    <van-nav-bar
      title="登录"
      left-arrow
      @click-left="onClickLeft"
    />

    <!-- 表单区域 -->
    <div class="form-container">
      <!-- 应用名称 -->
      <div class="app-title">
        <h2>全球电商</h2>
        <p>想买啥，就买啥，就是买买买</p>
      </div>

      <van-form @submit="onSubmit" class="login-form">
        <!-- 手机号 -->
        <van-field
          v-model="formData.phone"
          type="tel"
          label="手机号"
          :placeholder="placeholders.phone"
          @focus="handleFocus('phone')"
          :rules="[
            { required: true, message: '请输入手机号' },
            { pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误' }
          ]"
        />

        <!-- 图形验证码 -->
        <van-field
          v-model="formData.graphicCode"
          center
          label="图形码"
          :placeholder="placeholders.graphicCode"
          @focus="handleFocus('graphicCode')"
          :rules="[{ required: true, message: '请输入图形验证码' }]"
        >
          <template #button>
            <div v-if="graphicCodeUrl!=''" class="graphic-code" @click="refreshGraphicCode">
              <img :src="'data:image/png;base64,' + graphicCodeUrl" alt="图形验证码">
            </div>
          </template>
        </van-field>

        <!-- 短信验证码 -->
        <van-field
          v-model="formData.smsCode"
          center
          label="验证码"
          :placeholder="placeholders.smsCode"
          @focus="handleFocus('smsCode')"
        >
          <template #button>
            <van-button
              size="small"
              type="primary"
              :disabled="!!timer || !formData.phone || !formData.graphicCode"
              @click="sendSms()"
              native-type="button"
            >
              {{ timer ? `${countdown}s后重新获取` : '获取验证码' }}
            </van-button>
          </template>
        </van-field>

        <!-- 登录按钮 -->
        <div class="submit-btn">
          <van-button
            round
            block
            type="primary"
            native-type="submit"
            :loading="loading"
          >
            登录
          </van-button>
        </div>
      </van-form>

      <!-- 底部协议 -->
      <div class="agreement">
        登录即代表您已同意
        <span class="link">《用户服务协议》</span>
        和
        <span class="link">《隐私政策》</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getGraphicVerification, sendSmsCode, login } from '@/utils/api/user-api'

export default {
  name: 'LoginIndex',
  data () {
    return {
      formData: {
        phone: '',
        graphicCode: '',
        smsCode: '',
        uuid: ''
      },
      placeholders: {
        phone: '请输入手机号',
        graphicCode: '请输入图形验证码',
        smsCode: '请输入验证码'
      },
      // 使用默认的Base64图片作为初始验证码
      graphicCodeUrl: '',
      timer: null,
      countdown: 60,
      loading: false
    }
  },
  created () {
    this.refreshGraphicCode()
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    // 返回上一页
    onClickLeft () {
      this.$router.back()
    },

    // 刷新图形验证码
    async refreshGraphicCode () {
      try {
        const res = await getGraphicVerification()
        if (res.code === 200) {
          // 直接使用返回的Base64字符串
          this.graphicCodeUrl = res.data.image
          this.formData.uuid = res.data.uuid
          this.formData.graphicCode = ''
        }
      } catch (error) {
        this.$toast('获取图形验证码失败')
      }
    },

    // 发送短信验证码
    async sendSms () {
      if (!this.formData.phone || !this.formData.graphicCode) {
        return
      }

      try {
        const res = await sendSmsCode({
          phone: this.formData.phone,
          graphicCode: this.formData.graphicCode,
          uuid: this.formData.uuid
        })

        if (res.code === 200) {
          this.$notify({ type: 'success', message: '验证码发送成功' })
          // 开始倒计时
          this.startCountdown()
        } else {
          this.$toast(res.msg || '发送失败')
        }
      } catch (error) {
        this.$toast('发送失败')
      }
    },

    // 开始倒计时
    startCountdown () {
      this.countdown = 60
      this.timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--
        } else {
          clearInterval(this.timer)
          this.timer = null
        }
      }, 1000)
    },

    // 提交表单
    async onSubmit () {
      this.loading = true
      try {
        const res = await login(this.formData)
        if (res.code === 200) {
          this.$notify({ type: 'success', message: '登录成功' })
          this.$store.commit('userStore/updUserInfor', res.data)
          // TODO: 存储token和用户信息
          this.$router.push('/main')
        } else {
          this.$toast(res.msg || '登录失败')
        }
      } catch (error) {
        this.$toast('登录失败')
      } finally {
        this.loading = false
      }
    },

    // 处理输入框获取焦点
    handleFocus (field) {
      this.placeholders[field] = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;

  .form-container {
    flex: 1;
    padding: 0 20px;
    display: flex;
    flex-direction: column;

    .app-title {
      text-align: center;
      margin: 40px 0 60px;  // 增加底部间距

      h2 {
        font-size: 32px;
        color: #333;
        margin-bottom: 8px;
        font-weight: 600;
      }

      p {
        font-size: 14px;
        color: #999;
        margin: 0;
      }
    }

    .login-form {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin: -40px 0;  // 减小偏移量

      :deep(.van-cell) {
        margin-bottom: 20px;  // 增加输入框之间的间距
        padding: 10px 16px;
      }

      :deep(.van-field__label) {
        width: 90px;  // 固定标签宽度
        color: #333;
      }
    }
  }

  .graphic-code {
    height: 32px;
    width: 100px;
    margin-left: 10px;
    border-radius: 4px;  // 添加圆角
    overflow: hidden;  // 确保图片不超出圆角范围
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      vertical-align: middle;  // 修复图片底部可能的间隙
    }
  }

  .submit-btn {
    margin-top: 32px;  // 增加按钮上方间距
    padding: 0 12px;

    .van-button {
      height: 44px;
      font-size: 16px;
    }
  }

  .agreement {
    text-align: center;
    font-size: 12px;
    color: #999;
    margin: 16px 0 20px;

    .link {
      color: #2c8eff;
    }
  }
}
</style>
