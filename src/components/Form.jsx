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
      return fetch(state.url + "/cars/",{
        method: "post",
        headers:{
          "Content-Type" : "application/json",
          Authorization: "bearer " + token
        },
        body:JSON.stringify(formData),
      }).then((response)=> response.json());
    },
    edit: () => {
      return fetch(state.url + "/cars/" + state.edit.id ,{
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
          <form className="carForm" onSubmit={handleSubmit}>
          <label for="make">Vehicle Make</label>
                <input type ="text" name="make" value={formData.make} onChange={handleChange}></input>
                <label for="model">Vehicle Model</label>
                <input type ="text" name="model" value={formData.model} onChange={handleChange}></input>
                <label for="year">Year</label>
                <input type ="number" name="year" value={formData.year} onChange={handleChange}></input>
                <label for="miles">Mileage</label>
                <input type ="number" name="miles" value={formData.miles} onChange={handleChange}></input>
                <label for="service">Services</label>
                <input type ="text" name="services" value={formData.services} onChange={handleChange}></input>
                <label for="image">Image</label>
                <input type ="text" name="image" value={formData.image} onChange={handleChange}></input>
                <button className="carFormButton"type="submit" value={action}>{action}</button>
          </form>
      </div>
  )
}


export default Form