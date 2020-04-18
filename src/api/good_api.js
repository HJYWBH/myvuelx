import axios from 'axios'

export const getAllgoodsList = (params) => {
  return axios({
    url: 'goods',
    params
  })
}

export const getCateAllList = (type) => {
  return axios({
    url: 'categories',
    params: {
      type
    }
  })
}

export const addGoodsp = (data) => {
  return axios({
    url: 'goods',
    method: 'post',
    data
  })
}
