<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-card-header">
        Welcome
        <div class="login-card-subheader">
          Please select the appropriate login method
        </div>
      </div>
      
      <div class="login-card-body">
        <hr class="login-card-divider" />
        <button @click="googleLogin" class="login-card-button">
          <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-1024.png" alt="Google" class="login-card-button-icon" />
          <div class="login-card-button-text">
            Google 登录
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, provider, signInWithPopup } from '@/firebase.js';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginPage',
  setup() {
    const router = useRouter();

    const googleLogin = async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        console.log('User logged in:', result.user);  // 调试登录结果
        router.push('/');
      } catch (error) {
        console.error('登录失败:', error);
      }
    };

    return { googleLogin };
  },
};
</script>

<style scoped>
.login-container {
  background-color: #e9ecef;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-card-header {
  font-size: 34px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 20px;
  text-align: center;
}

.login-card-subheader {
  font-size: 20px;
  color: #6c757d;
  font-weight: normal;
  margin-top: 20px;
}

.login-card-button-icon {
  width: 22px;
  height: 22px;
  margin-right: 10px;
}

.login-card-button-text {
  font-size: 14px;
}

.login-card-button {
  width: 40%;
  height: 40px;
  background-color: #343a40;
  color: #f8f9fa;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card-body {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-card-divider {
  width: 60%;
  height: 1px;
  background-color: #e9ecef;
  color: #e9ecef;
}

.login-card {
  width: 600px;
  background-color: #f8f9fa;
  border-radius: 30px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

@media (max-width: 768px) {
  .login-card {
    width: 400px;
  }

  .login-card-divider {
    width: 80%;
  }

  .login-card-button {
    width: 60%;
  }
}
</style>
