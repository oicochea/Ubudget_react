import React from "react"
import {Link} from "react-router-dom"
import {useAppState} from "../AppState.jsx"

const Nav = (props) => {
  const { state, dispatch} = useAppState()
  return <header>
    <nav>
    {!state.token ? (
            <>
            <Link to="/" className="topLinks"><div>Home</div></Link>
            <Link to="/auth/signup" className="topLinks"><div>Signup</div></Link>
            <Link to="/auth/login" className="topLinks"><div>Login</div></Link>
            </>
        ) : null}
            {state.token ? <div onClick={() => {
                dispatch({type: "logout"})
                props.history.push("/")
            }}>Logout</div> : null}
        </nav>
  </header>
}

export default Nav