import axios from '@/api/commont.js'

export const roleAllList = () => {
  return axios({
    url: 'roles'
  })
}

export const addrole = (data) => {
  return axios({
    url: 'roles',
    method: 'post',
    data
  })
}

export const editroles = (data) => {
  return axios({
    url: `roles/${data.id}`,
    method: 'put',
    data
  })
}

export const deleterole = (id) => {
  return axios({
    url: `roles/${id}`,
    method: 'delete'
  })
}
