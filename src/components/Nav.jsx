import React from "react"
import {Link} from "react-router-dom"
import {useAppState} from "../AppState.jsx"

const Nav = (props) => {
  const { state, dispatch} = useAppState()
  return  <nav class="breadcrumb is-centered" aria-label="breadcrumbs">
    <div className="title">Ubudget</div>
    <ul>
      {/* <li><div>Ubudget &nbsp;&nbsp;</div></li> */}
    {!state.token ? (
            <>
            <li><Link to="/" ><div>Home</div></Link></li>
            <li><Link to="/auth/signup" ><div>Signup</div></Link></li>
            <li><Link to="/auth/login" ><div>Login</div></Link></li>
            </>
        ) : null}
            <li><a>{state.token ? <div onClick={() => {
                dispatch({type: "logout"})
                props.history.push("/")
            }}>Logout</div> : null}</a></li>
    {/* <li class="is-active"><a href="#" aria-current="page"></a></li> */}
  </ul>
</nav>
}

export default Nav