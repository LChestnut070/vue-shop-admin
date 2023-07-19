import mockrequest from '@/utils/mockrequest'

const state = {
  list: {}
}

const mutations = {
  GETDATA(state,list) {
    state.list = list
  }
}

const actions = {
  async getData({commit}) {
    const res = await mockrequest.get('/home/list')
    console.log(res)
    if (res.code === 20000) {
      commit('GETDATA', res.data)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

