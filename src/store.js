import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  usersname: ''
}
const mutations = {
  getUsername: (state, value) => {
    state.usersname = value
  }
}
const actions = {
  getUsernameactions ({ commit }, value) {
    commit('getUsername', value)
  }
}
const getters = {
  getUsernamess (state) {
    return state.usersname
  }
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
