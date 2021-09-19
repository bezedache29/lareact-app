import axios from 'axios'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Navbar from '../partials/Navbar'
import { GoogleLoginButton } from 'react-social-login-buttons'

export class Login extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       email: "",
       password: "",
       redirect: false,
       errors: []
    }
  }

  componentDidMount() {
    if (sessionStorage.getItem('token')) {
      this.setState({ redirect: true })
    }
  }

  handleEmailChange = event => {
    this.setState({ email: event.target.value }, () => {
      console.log(this.state)
    })
  }

  handlePasswordChange = event => {
    this.setState({ password: event.target.value }, () => {
      console.log(this.state)
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    
    let bodyFormData = new FormData()
    bodyFormData.set('email', this.state.email)
    bodyFormData.set('password', this.state.password)

    axios.post('https://lareact-api.ripley.eu/api/login', bodyFormData)
      .then(res => {
        console.log(res.data)
        sessionStorage.setItem('token', res.data.api_token)
        this.setState({ redirect: true })
      })
      .catch(error => {
        if (error.response.status === 401) {
          this.setState({ errors: error.response.data.errors }, () => {
            console.log(this.state.errors)
          })
        }
        console.log(error.response)
      })
  }
  
  render() {

    if (this.state.redirect) {
      return <Redirect to="/" />
    }

    return (
      <>
        <Navbar />

        <div className="w-50 mx-auto">
          <h2 className="my-3 text-center">Connexion</h2>
          <form method="POST" onSubmit={ this.handleSubmit }>
          
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Adresse email</label>
              <input 
                type="email" 
                className={ `form-control ${this.state.errors.email ? 'is-invalid' : ''}` } 
                id="email" 
                aria-describedby="emailHelp" 
                onChange={ this.handleEmailChange }
              />
              { this.state.errors.email ? <div className="text-danger">{ this.state.errors.email }</div> : '' }
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Mot de passe</label>
              <input 
                type="password" 
                className={ `form-control ${this.state.errors.password ? 'is-invalid' : ''}` }
                id="password" 
                onChange={ this.handlePasswordChange }
              />
              { this.state.errors.password ? <div className="text-danger">{ this.state.errors.password }</div> : '' }
            </div>

            { this.state.errors.bad_credentials ? <div className="alert alert-warning">{ this.state.errors.bad_credentials }</div> : '' }
            
            <button type="submit" className="btn btn-primary">Me connecter</button>
            
          </form>
        </div>
        <div className="d-flex justify-content-center mt-5">
          <a href="https://lareact-api.ripley.eu/auth/redirect/google">
            <GoogleLoginButton style={{ maxWidth: 400, minWidth: 300 }} />
          </a>
        </div>
      </>
    )
  }
}

export default Login
