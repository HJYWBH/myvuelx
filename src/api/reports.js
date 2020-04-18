import axios from 'axios'

export const tubiaoge = () => {
  return axios({
    url: 'reports/:type'
  })
}
