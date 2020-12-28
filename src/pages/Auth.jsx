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
      <div class="box">
      <div className="authForm">
      <form onSubmit={handleSubmit}>
      <div class="field">
      <label class="label">Username</label>
      <div class="control has-icons-left">
          <input class="input is-success" type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange}/>
          <span class="icon is-small is-left">
      <i class="fas fa-user"></i>
    </span>
          </div>
          </div>
          <div class="field">
          <label class="label">Password</label>
          <div class="control has-icons-left">
          <input class="input is-success" type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange}/>
          <span class="icon is-small is-left">
      <i class="fas fa-check"></i>
    </span>
          </div>
          </div>
          <div class="buttonsContainer">
        <button class="button is-primary" type="submit"   value={type}>{type}</button>
        </div>
        </form>
  
        </div>
        </div>
        </div>
    )
    }
export default Auth