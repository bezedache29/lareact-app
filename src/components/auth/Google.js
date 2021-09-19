import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export class Google extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       redirect: false
    }
  }

  componentDidMount() {
    const provider = this.props.match.params.provider
    const userToken = this.props.match.params.token

    if (!userToken || provider) {
      this.setState({ redirect: true })
    }

    sessionStorage.setItem('token', userToken)
    this.setState({ redirect: true })
  }
  
  render() {

    if (this.state.redirect) {
      return <Redirect to="/" />
    }

    return (
      <>
        Google Auth
      </>
    )
  }
}

export default Google
