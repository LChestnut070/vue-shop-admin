import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { anyRoutes, asyncRoutes, constantRoutes, resetRouter } from '@/router'
import cloneDeep from 'lodash/cloneDeep'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    routes: [],
    // 角色信息
    roles: [],
    // 按钮权限的信息
    buttons: [],
    // 对比之后【项目中已有的异步路由，与服务器返回的标记信息进行对比最终需要展示的理由】
    resultAsyncRoutes: [],
    // 用户最终需要展示全部路由
    resultAllRoutes: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO: (state, userinfo) => {
    state.name = userinfo.name
    // 用户头像
    state.avatar = userinfo.avatar
    // 菜单权限标记
    state.routes = userinfo.routes
    // 按钮权限标记
    state.buttons = userinfo.buttons
    // 角色
    state.roles = userinfo.roles
  },
  SET_RESULTASYNCROUTES: (state, asyncRoutes) => {
    state.resultAsyncRoutes = asyncRoutes
    state.resultAllRoutes = constantRoutes.concat(state.resultAsyncRoutes, anyRoutes)
    console.log(state.resultAllRoutes)
    // const newRouter = createRouter()
    // router.matcher = newRouter.matcher
    resetRouter()
    router.addRoutes(state.resultAllRoutes)
    router.options.routes = state.resultAllRoutes
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        commit('SET_USERINFO', data)
        commit('SET_RESULTASYNCROUTES', computedAsyncRoutes(cloneDeep(asyncRoutes), data.routes))
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

const computedAsyncRoutes = (asyncRoutes, routes) => {
  return asyncRoutes.filter(item => {
    // 如果服务器返回的数组有这个元素
    if (routes.indexOf(item.name) !== -1) {
      // 如果异步路由有子路由
      if (item.children && item.length !== -1) {
        item.children = computedAsyncRoutes(item.children, routes)
      }
      return true
    }
  })
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

