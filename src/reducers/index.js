import {createStore} from "redux";

export function setLogin(payload) {
    sessionStorage.setItem("login", payload);
    if(payload===false){
        localStorage.setItem("token", null);
    }
    return {
        type: "SET_LOGIN",
        payload
    }
}

const initialState = {
    loginStatus:sessionStorage.getItem("login")||false,
}

function reducer(state=initialState, action) {
    switch(action.type) {
        case "SET_LOGIN":
                return { ...state, loginStatus:action.payload};             
        default:
            return state;
    }
}

const store = createStore(reducer)
store.subscribe(() => console.log(store.getState()))
export default store