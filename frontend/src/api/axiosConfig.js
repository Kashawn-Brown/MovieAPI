import axios from "axios";

export default axios.create({
    baseURL: '',
    headers: {"ngrok-skip-browsing-warning": "true"}
})

// http://localhost:5000/

//Can come back to configure later
//its helpful for managing requests in a more organized way