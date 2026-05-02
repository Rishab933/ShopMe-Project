import axios from 'axios'

export async function getData() {
    //const response = await axios.get('https://fakestoreapi.com/products')
    const response = await axios.get('https://dummyjson.com/products?limit=100')
    //console.log("Response from API:", response.data.products)
    return response.data.products // Return the data directly
}