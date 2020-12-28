import React, { Component } from 'react';
import Chart from 'chart.js'
import {useAppState} from "../AppState.jsx"

const PieChart = (props) =>{

  const {state, dispatch } = useAppState()
  const {token , url , username} = state

    const prepareData = (data) => {
        const chartData = {
            labels: [],
            datasets:[
                {
                    label: "",
                    data:[],
                    backgroundColor: "rgba(54,162,235,0.6)",
              borderWidth: 1,
              borderColor: "#777"
                },
            ],
        }
        data.forEach(
            (expense) => {
                console.log(expenses)
            chartData.labels.push(expense.category)
            chartData.datasets[0].data.push(expense.ammount)
        })
	return chartData
}

const createChart = (data) => {
    //similar $("#temperatures")
    const ctx = document.querySelector("#expenses")
    const expensesChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        
    })
}
const getExpenses = async () => {
    const response = await fetch("https://ubudget-api.herokuapp.com/expenses/", {
        method: "get",
        headers:{
          Authorization: "bearer " + token
        }
      })
    const data = await response.json()
    console.log(data)
    const income = data[data.length-1].income
    console.log(data[data.length-1].income)
    const chartData = await prepareData(data)
    console.log(chartData)
    createChart(chartData)
}
React.useEffect(() => {
    getExpenses()
}, [])

    React.useEffect(()=> {getExpenses()}, [])
        return (
          <>
            <canvas id="expenses" width="300" height="100"></canvas>
          </>
        )
      }
export default PieChart