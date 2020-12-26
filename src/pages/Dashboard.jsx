import React from "react"
import {useAppState} from "../AppState.jsx"
import{Route, Link} from "react-router-dom"
import Form from "../components/Form.jsx"



const Dashboard = (props) => {

  const {state, dispatch } = useAppState()
  const {token , url ,expenses , username} = state

  const getExpenseInfo = async () => {
  const response = await fetch(url + "/expenses/", {
    method: "get",
    headers:{
      Authorization: "bearer " + token
    }
  })
  const expenses = await response.json()
 dispatch({type: "getExpenseInfo", payload:expenses})
 console.log(expenses)
  }

  React.useEffect(() => {getExpenseInfo()}, [])

  const loaded = () => {
    return <div className="dashboardHome"><h1>Dashboard</h1>
    <div className="dashboardTitle">{username}'s Spending</div>
        <Link to="/dashboard/new"><button>Add an Expense</button></Link>
        <Route path="/dashboard/:action" render={(rp) => <Form {...rp} getExpenseInfo={getExpenseInfo}/>}/>
        <div className="collectionExpenses">
    {expenses.map(expense => (
            <div className="expenseEach" key={expense.id}>
                <h4>{expense.category}</h4> 
                    <button onClick={() => {
                        dispatch({type: "select", payload: expense})
                        props.history.push("/dashboard/edit")
                    }}>Edit</button>
                    <button onClick={() => {
                        fetch(url + "/expenses/" + expense.id, {
                            method: "delete",
                            headers: {
                                Authorization: "bearer " + token
                            }
                        }).then(() => getExpenseInfo());
                    }}>Delete</button> 
             </div>
        ))}
    </div>
    </div>
}

 return expenses ? loaded() : <h1>Loading...</h1>
}

export default Dashboard