import React from "react"
import { useAppState } from "../AppState.jsx"

const Auth = (props) => {

const type = props.match.params.form
const [formData, setFormData] = React.useState({
    username: "",
    password: ""
});
const [userData, setUserData] = React.useState(null)
const { state, dispatch } = useAppState()

React.useEffect(() => {
    if (userData) {
        console.log(userData)
        const { token, user } =userData;
        dispatch({ type: "auth", payload: {token, username: user.username } });
        window.localStorage.setItem(
            "auth", 
            JSON.stringify({ token, username: user.username }))
        props.history.push("/dashboard")
    }
}, [userData]);
  const actions = {
    signup: () => {
      return fetch(state.url + "/users",{
        method: "post",
        headers:{
          "Content-Type" : "application/json",
        },
        body:JSON.stringify(formData),
      }).then((response)=> response.json());
    },
    login: () => {
      return fetch(state.url + "/login",{
        method: "post",
        headers:{
          "Content-Type" : "application/json",
        },
        body:JSON.stringify(formData),
      }).then((response)=> response.json())
    }
  }

  const handleChange = (event) => {
    setFormData({...formData , [event.target.name] :event.target.value})
  }

  const handleSubmit =(event)=>{
    event.preventDefault()
    actions[type]().then((data)=>{
      setUserData(data);
    })
  }

    return (<div >
      <div>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
          <input type="text" name="username" placeholder="Enter Username" value={formData.username} onChange={handleChange}/>
          <label>Password</label>
          <input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange}/>
        <button type="submit" classnName="authFormButton"  value={type}>{type}</button>
        </form>
        </div>
        </div>
    )
    }
export default Auth