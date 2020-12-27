import React from "react"
import { Link } from "react-router-dom"
import {useAppState} from "../AppState.jsx"

const Form = (props) => {
  const { state, dispatch} = useAppState();
  const{token} = state
  const action  = props.match.params.action
  const[formData , setFormData] = React.useState(state[action])

  const actions  = {
    new: () => {
      return fetch(state.url + "/expenses/",{
        method: "post",
        headers:{
          "Content-Type" : "application/json",
          Authorization: "bearer " + token
        },
        body:JSON.stringify(formData),
      }).then((response)=> response.json());
    },
    edit: () => {
      return fetch(state.url + "/expenses/" + state.edit.id ,{
        method: "put",
        headers:{
          "Content-Type" : "application/json",
          Authorization: "bearer " + token
        },
        body: JSON.stringify(formData),
      }).then((response)=> response.json())
    }
  }

  const handleChange = (event) => {
    setFormData({...formData , [event.target.name] :event.target.value})
  }

  const handleSubmit =(event)=>{
    event.preventDefault()
    actions[action]().then((data)=>{
      props.getCarInfo()
      props.history.push("/dashboard/")
    })
  }

  return (
      <div >
          <form className="expenseForm" onSubmit={handleSubmit}>
          <label for="category">Category</label>
                <select type ="text" name="category" value={formData.category} onChange={handleChange}>
                <option value="food">Food</option>
                <option value="rent">Rent</option>
                <option value="utilities">Utilities</option>
                <option value="entertainment">Entertainment</option>
                <option value="livingExpenses">Living Expenses</option>
                </select>
                <label for="ammount">Ammount</label>
                <input type ="number" name="ammount" value={formData.ammount} onChange={handleChange}></input>
                <label for="month">Month</label>
                <select type ="number" name="month" value={formData.month} onChange={handleChange}>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
                </select>
                <label for="income">Monthly Income</label>
                <input type ="number" name="income" value={formData.income} onChange={handleChange}></input>
                <button type="submit" value={action}>{action}</button>
          </form>
      </div>
  )
}


export default Form