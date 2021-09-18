import React, { Component } from 'react'
import Loader from "react-loader-spinner";

export class AppLoader extends Component {
  render() {
    return (
      <Loader
        type="Oval"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    )
  }
}

export default AppLoader
