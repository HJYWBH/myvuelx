import axios from 'axios'

export const getAllRightlist = (type) => {
  return axios({
    url: `rights/${type}`
  })
}

export const delzhidingquanxian = (roleId, rightId) => {
  return axios({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}

export const fenpeiquanxian = (roleId, rids) => {
  return axios({
    url: `roles/${roleId}/rights`,
    method: 'post',
    data: {
      rids
    }
  })
}

export const leftmeus = () => {
  return axios({
    url: 'menus'
  })
}
