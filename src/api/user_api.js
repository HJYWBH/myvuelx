import axios from '@/api/commont.js'

// export const login = (data) => {
//   return axios({
//     method: 'post',
//     url: 'login',
//     data
//   })
// }

// export const usersList = (params) => {
//   return axios({
//     url: 'users',
//     params
//   })
// }

export const addusers = (data) => {
  return axios({
    method: 'post',
    url: 'users',
    data
  })
}

export const delusers = (id) => {
  return axios({
    method: 'delete',
    url: `users/${id}`
  })
}

export const statususers = (uId, type) => {
  return axios({
    method: 'put',
    url: `users/${uId}/state/${type}`
  })
}

export const fenpeiuser = (id, rid) => {
  return axios({
    method: 'put',
    url: `users/${id}/role`,
    data: {
      rid
    }
  })
}

export const edittijiao = (data) => {
  return axios({
    method: 'put',
    url: `users/${data.id}`,
    data
  })
}
