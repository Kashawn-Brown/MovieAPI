import axios from "axios";

export default axios.create({
    // baseURL: 'http://localhost:5000/',
    baseURL: 'http://15.157.118.12:5000/',
    headers: {"ngrok-skip-browsing-warning": "true"}
})

//Can come back to configure later
//its helpful for managing requests in a more organized way