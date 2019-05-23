import axios from "axios";

export function loadUsers(){
    return(dispatch) => {
        return axios.get("https://reqres.in/api/users?page=2")
        .then((response) => {
            dispatch(logIn(response.data.id))
        })
    }
}

export function logIn(user) {
    return{
        type: "LOG_IN",
        
    }
}