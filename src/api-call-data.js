import React, { Component } from 'react';
import axios from 'axios';

const url = 'https://www.alphavantage.co/query'
const apiKey= "ZJYZMYX8B8TH5QWG"

class ApiCall extends Component {
  constructor(){
    super()
      this.state={
        company:"",
        interval:null,
        matches:[]
      }

  }

  getUserCompany = (company)=>{
    axios.get(`${url}`,{
      params: {
        function:"TIME_SERIES_DAILY",
        symbol: `${company}`,
        interval:"5min",
        apikey:`${apiKey}`,
        datatype:"json"
      }
    }).then((res)=>{
      console.log(res);
      })
  }


  companyMatches=(keywords)=>{
    axios.get(`${url}`,{
      params:{
        function:"SYMBOL_SEARCH",
        keywords:keywords,
        apikey:`${apiKey}`,
        datatype:"json"
      }
    }).then((res)=>{
      let companyArray = res.data.bestMatches.map((company)=>{
        let companyName = company["2. name"]
        let companySymbol = company["1. symbol"]
        
        return {companyName,companySymbol}
      })
      this.setState({
        matches:companyArray
      })

    })
  }
  



  handleChange=(e)=>{
    this.setState({[e.target.id]:e.target.value});
    this.companyMatches(e.target.value)
  }

  submit=(e)=>{
    e.preventDefault();
    this.getUserCompany(this.state.company);
  }

  autoFill=(e)=>{
    if(e.target.id === undefined){
      return null
    } else {
      this.setState({company:e.target.id},()=>{
        this.getUserCompany(this.state.symbol)
      })
    }
  }

  render(){
    return (
      <div className="wrapper">
        <form htmlFor="companySelection" onSubmit={this.submit}>
          <label htmlFor="company">
            <p>please select your company</p>
            <input type="text" id="company" value={this.state.company} onChange={this.handleChange} />
          </label>
          <input type="submit"/>
        </form>
        <ul>
          {this.state.matches.map((company)=>{
            return(
              <li onClick={this.autoFill} id={company.companySymbol} key={company.companySymbol}>{company.companyName}</li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default ApiCall