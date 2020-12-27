import React, { useContext, useReducer } from "react"


/////////
//Initial state - 
///////

const initialState = {
    url : "https://ubudget-api.herokuapp.com",
    token: null,
    username:null,
    expenses: null,
    new:{
        category:"",
        ammount:0,
        month: 0 ,
        income: 0
    },
    edit:{
        id:0,
        category:"",
        ammount:0,
        month: 0 ,
        income: 0
    }
}



//////
//Reducer 
//////
//action = {type: 'action', payload (what we need)--}
const reducer = (state, action) => {

    let newState;
    switch (action.type){
        case "auth":
        newState = {...state,...action.payload};
        return newState;
        break;
        case "logout":
        newState = {...state , token:null , username:null}
        window.localStorage.removeItem("auth")
        return newState;
        break
        case "getExpenseInfo":
            newState = {...state, expenses: action.payload}
            return newState;
            case "select":
                newState = {...state, edit: action.payload}
                return newState;
                break;
            default:
                return state;
                break;
        }
    }
    // switch(action.type){
    //     case"signup":
    //     fetch(state.url + "/users/" , {
    //         method:"post",
    //         headers: {
    //             "content-Type": "application/json"
    //         },
    //         body: JSON.stringify(action.payload)
    //     })
    //     .then(Response => Response.json())
    //     .then(user => {
    //         return{
    //             ...state,
    //             token: user.token,
    //             username: user.username,
    //         }
    //     });
    //     break
    //     case"login":
    //     fetch(state.url + "/login/" , {
    //         method:"post",
    //         headers: {
    //             "content-Type": "application/json"
    //         },
    //         body: JSON.stringify(action.payload)
    //     })
    //     .then(Response => Response.json())
    //     .then(user => {
    //         return{
    //             ...state,
    //             token: user.token ,
    //             username: user.username,
    //         }
    //     })
    //     break
    //     default:
    //         return state
/////////
////APpCOntext
/////

const AppContext = React.createContext(null)


/////
//App State Component
/////

export const AppState = (props) =>{

    const[ state, dispatch] = useReducer(reducer, initialState)

    return <AppContext.Provider value ={{ state, dispatch}}>{props.children}</AppContext.Provider>;
};


//hook- useAppState

 export const useAppState = ()=>{
    return React.useContext(AppContext)
}

 
