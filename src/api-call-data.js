import React, { Component } from 'react';
import axios from 'axios';

const url = 'https://ws-api.iextrading.com/1.0/tops'

class ApiCall extends Component {
  constructor(){
    super()
  }
  componentDidMount(){
  axios.get(url).then((results)=>{
    console.log(results);
  })
  }

  render(){
    return (
      <div>
        <p>  “Data provided for free by IEX. View IEX’s Terms of Use.”</p>
      </div>
    )
  }
}

export default ApiCall