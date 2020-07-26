import axios from 'axios'

export default axios.create({
    baseURL:'https://blooming-inlet-21211.herokuapp.com/api/transaction',
    headers:{
        'Content-type':'application/json'
    }
})