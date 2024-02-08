import axios from "axios";

const getProducts = () => {
  try {
    return axios.get('/api/products')
      .then(res => {
        return res.data
      })
  } catch (e) {
    console.error(e)
  }
}

const deleteProduct = (id) => {
  try {
    return axios.delete(`/api/products/${id}`)
  } catch (e) {
    console.error(e)
  }
}

const editProduct = (id, title, price, quantity) => {
  try {
    return axios.put(`api/products/${id}`, { title, price, quantity })
  } catch (e) {
    console.error(e)
  }
}

export { getProducts, deleteProduct, editProduct }