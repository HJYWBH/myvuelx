import axios from '@/api/commont.js'

export const roleAllList = () => {
  return axios({
    url: 'roles'
  })
}
