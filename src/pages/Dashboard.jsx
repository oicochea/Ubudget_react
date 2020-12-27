import React from "react"
import {useAppState} from "../AppState.jsx"
import{Route, Link} from "react-router-dom"
import Form from "../components/Form.jsx"
import PieChart from "../components/PieChart.js"



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
  }

  React.useEffect(() => {getExpenseInfo()}, [])

  const loaded = () => {
    return <div>
    <div className="dashboardTitle">{username}'s Lets Take a Look at Your Finances</div>
    <PieChart/>
        <Link to="/dashboard/new"><button>New Expense</button></Link>
        <Route path="/dashboard/:action" render={(rp) => <Form {...rp} getExpenseInfo={getExpenseInfo}/>}/>
        <div className="collectionExpenses">
    {expenses.map(expense => (
            <div className="expenseEach" key={expense.id}>
                <h4>{expense.category}</h4> 
                <span class="icon has-text-info">
                <i class="fas fa-info-circle" onClick={() => {
                        dispatch({type: "select", payload: expense})
                        props.history.push("/dashboard/edit")
                    }}>!</i>
                    </span>
                   <a class="delete is-medium" onClick={() => {
                        fetch(url + "/expenses/" + expense.id, {
                            method: "delete",
                            headers: {
                                Authorization: "bearer " + token
                            }
                        }).then(() => getExpenseInfo());
                    }}>Delete</a> 
             </div>
        ))}
    </div>
    </div>
}

 return expenses ? loaded() : <h1>Loading...</h1>
}

export default Dashboard