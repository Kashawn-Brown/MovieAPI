import axios from "axios";

export default axios.create({
    baseURL: 'http://localhost:5000/',
    headers: {"ngrok-skip-browsing-warning": "true"}
})

//Can come back to configure later
//its helpful for managing requests in a more organized way