import axios from "axios";

const getCart = () => {
  try {
    return axios.get('/api/cart')
      .then(res => {
        return res.data
      })
  } catch (e) {
    console.error(e)
  }
}

const addToCart = (productId) => {
  try {
    return axios.post('/api/add-to-cart', { productId })
      .then(res => {
        return res.data
      })
  } catch (e) {
    console.error(e)
  }
}

export { getCart, addToCart }