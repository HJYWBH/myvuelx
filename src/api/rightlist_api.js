import axios from 'axios'

export const getAllRightlist = (type) => {
  return axios({
    url: `rights/${type}`
  })
}
