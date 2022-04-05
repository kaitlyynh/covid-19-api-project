import React from "react"
import "./index.css"
import AddToTable from "./AddToTable"
class App extends React.Component {
 constructor() {
   super()
   this.state = {
     provinceState: "",
     confirmed: 0,
     recovery: 0,
     deaths: 0,
     storedInfo: {},
     tableInfo: []
   }
   this.handleChange = this.handleChange.bind(this)
   this.handleClick = this.handleClick.bind(this)
   this.handleAddToTable = this.handleAddToTable.bind(this)
 }
 handleChange(event) {
   this.setState({
     [event.target.name]:event.target.value,
   })
 }
 handleClick() {
   console.log("You searched: ", this.state.provinceState)
   const arr = this.state.storedInfo
   const index = arr.findIndex(object => {
     return object.provinceState === this.state.provinceState
   })
   if (index === -1) {
     alert("Region doesn't exist")
   } else {
     this.setState( {
       deaths: arr[index].deaths,
       confirmed: arr[index].confirmed,
       recovery: (arr[index].recovered === null ? "Not found in API" : arr[index].recovered)
     })
   }
 }
 handleAddToTable() {
  const arr = this.state.storedInfo
  const index = arr.findIndex(object => {
    return object.provinceState === this.state.provinceState
   })
  this.setState({
    tableInfo: [...this.state.tableInfo, arr[index]]
  })
 }
 componentDidMount() {
   console.log("Hello")
   fetch("https://covid19.mathdro.id/api/confirmed")
     .then(response => response.json())
     .then(data => {
       //console.log(data)
       this.setState({
         storedInfo: data
       })
     })
 }
 render() {
   return (
     <div className="style">
       <div class="header">
       <h1 className="black">--- COVID-19 Statisic Region Tracker ---</h1>
       <h5><a href="https://covid19.mathdro.id/api/confirmed">Link to COVID-19 API</a></h5>
       <hr/>
       </div>
       <br/>
         <form>
           <label>Enter a State: </label>
           <input
           name="provinceState"
           onChange={this.handleChange}
           type="text"
           placeholder="Click here"
           value={this.state.provinceState} />
         </form>
         <button className="button-style" onClick={this.handleClick}>Search</button>
         <div className="info-display">
         <p>Searched region: {this.state.provinceState}</p>
         <p>Death toll: {this.state.deaths}</p>
         <p>Recovered: {this.state.recovery}</p>
         <p>Total confirmed cases: {this.state.confirmed}</p>
         <button onClick={this.handleAddToTable} className="button-style-table">Add To Table</button>
         </div>
         <br/>
         <hr/>
         <div>
           <table className="table-class">
             <thead>
               <tr>
                 <th>State</th>
                 <th>Confirmed Cases</th>
                 <th>Recoveries</th>
                 <th>Deaths</th>
               </tr>
             </thead>
             <tbody>
                 {this.state.tableInfo.map(states => 
                 <AddToTable 
                  provinceState={states.provinceState} 
                  confirmed={states.confirmed} 
                  deaths={states.deaths} r
                  ecovery={states.recovered}
                  />)}
               </tbody>
           </table>
         </div>
     </div>
   )
 }
}
export default App
 
