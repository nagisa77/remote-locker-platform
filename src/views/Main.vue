<template>
  <div class="container">
    <div class="logout-button">
      <button @click="logout">Logout</button>
    </div>
    <h1>My devices</h1>
    <div class="device-card">
      <div v-if="loading" class="loading-icon">
        <l-tail-chase size="40" speed="1.75" color="black"></l-tail-chase>
      </div>
      <div v-else class="device-status-container">
        <div v-for="(status, deviceName) in devices" :key="deviceName" class="device-status-item">
          <div class="device-name">{{ deviceName }}</div>
          <div class="device-status-right-container">
            <button v-if="status === 1" class="pi pi-lock lock-button" @click="lockDevice(deviceName)"></button>
            <div :class="['device-status', { 'online': status === 1, 'offline': status !== 1 }]">
              {{ status === 1 ? 'online' : 'offline' }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 添加 Toast 组件 -->
    <div v-if="showToast" class="toast" :class="toastType">
      {{ toastMessage }}
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { getAuth, signOut } from 'firebase/auth'
import { getDatabase, ref as dbRef, onValue, off, set } from 'firebase/database'
import { getApp } from 'firebase/app'
import { useRouter } from 'vue-router'
import { tailChase } from 'ldrs'

tailChase.register()

export default {
  name: 'MainPage',
  setup() {
    const devices = ref({})
    const loading = ref(true)
    const router = useRouter()
    let userDevicesRef = null

    const logout = async () => {
      const auth = getAuth()
      try {
        await signOut(auth)
        showToastMessage('退出登录成功', 'success')
        router.push('/login')
      } catch (error) {
        console.error('退出登录失败:', error)
        showToastMessage('退出登录失败', 'error')
      }
    }

    const lockDevice = (deviceName) => {
      console.log(`锁定设备: ${deviceName}`)
      const app = getApp()
      const db = getDatabase(app, "https://remotelocker-e2e68-default-rtdb.asia-southeast1.firebasedatabase.app")
      const auth = getAuth()
      const user = auth.currentUser

      if (user) {
        const deviceRef = dbRef(db, `${user.uid}/${deviceName}`)
        set(deviceRef, 0)
          .then(() => {
            console.log(`设备 ${deviceName} 已锁定`)
            showToastMessage(`设备 ${deviceName} 已锁定`, 'success')
          })
          .catch((error) => {
            console.error(`锁定设备 ${deviceName} 失败:`, error)
            showToastMessage(`锁定设备 ${deviceName} 失败`, 'error')
          })
      } else {
        console.error('用户未登录')
        showToastMessage('用户未登录', 'error')
      }
    }

    // 添加 toast 相关的响应式变量
    const showToast = ref(false)
    const toastMessage = ref('')
    const toastType = ref('success')

    onMounted(() => {
      const auth = getAuth()
      const user = auth.currentUser

      if (user) {
        const app = getApp()
        const db = getDatabase(app, "https://remotelocker-e2e68-default-rtdb.asia-southeast1.firebasedatabase.app")
        userDevicesRef = dbRef(db, user.uid)

        onValue(userDevicesRef, (snapshot) => {
          const fetchedData = snapshot.val()
          devices.value = fetchedData || {}
          loading.value = false
        })
      } else {
        console.error('用户未登录')
        loading.value = false
      }
    })

    onUnmounted(() => {
      if (userDevicesRef) {
        off(userDevicesRef)
      }
    })

    // 显示 toast 的函数
    const showToastMessage = (message, type = 'success') => {
      toastMessage.value = message
      toastType.value = type
      showToast.value = true
      setTimeout(() => {
        showToast.value = false
      }, 3000)
    }

    return {
      devices,
      loading,
      logout,
      lockDevice,
      showToast,
      toastMessage,
      toastType
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #e9ecef;
  position: relative;
}

.device-status-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.device-status-right-container {
  display: flex;
  align-items: center;
}

.device-status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 10px;
  font-size: 1.2em;
  color: #333;
  background-color: #e9ecef;
  width: calc(100% - 20px);
  height: 80px;
  border-radius: 20px;
}

.device-name {
  margin-left: 20px;
}

.lock-button {
  background-color: #f8f9fa;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
  margin-right: 20px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #333;
}

.device-status {
  margin-right: 20px;
  font-weight: bold;
}

.online {
  color: #28a745;
}

.offline {
  color: #dc3545;
}

.loading-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.device-card {
  width: 80%;
  height: 80%;
  border-radius: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f8f9fa;
}

.logout-button {
  position: absolute;
  top: 20px;
  right: 20px;
}

.logout-button button {
  padding: 10px 20px;
  background-color: #dee2e6;
  color: #6c757d;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.logout-button button:hover {
  background-color: #c82333;
  color: #f8f9fa;
}

/* 添加 Toast 样式 */
.toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  z-index: 1000;
}

.success {
  background-color: #28a745;
}

.error {
  background-color: #dc3545;
}
</style>
