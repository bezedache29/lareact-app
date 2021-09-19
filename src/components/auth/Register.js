import React, { Component } from 'react'
import axios from 'axios'
import Navbar from '../partials/Navbar'
import { Redirect } from 'react-router-dom'

export class Register extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       pseudo: "",
       email: "",
       password: "",
       password_confirmation: "",
       redirect: false,
       errors: []
    }
  }

  componentDidMount() {
    if (sessionStorage.getItem('token')) {
      this.setState({ redirect: true })
    }
  }

  handlePseudoChange = event => {
    this.setState({ pseudo: event.target.value }, () => {
      console.log(this.state)
    })
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

  handlePasswordConfirmationChange = event => {
    this.setState({ password_confirmation: event.target.value }, () => {
      console.log(this.state)
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    
    // Permet de creer un objet FormData avec des headers défini par default
    let bodyFormData = new FormData()
    bodyFormData.set('pseudo', this.state.pseudo)
    bodyFormData.set('email', this.state.email)
    bodyFormData.set('password', this.state.password)
    bodyFormData.set('password_confirmation', this.state.password_confirmation)

    axios.post('https://lareact-api.ripley.eu/api/register', bodyFormData)
      .then(res => {
        sessionStorage.setItem('token', res.data.api_token)
        this.setState({ redirect: true })
      })
      .catch(error => {
        if (error.response.status === 401) {
          this.setState({ errors: error.response.data.errors }, () => {
            console.log(this.state.errors)
          })
        }
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
          <h2 className="my-3 text-center">Inscription</h2>
          <form method="POST" onSubmit={ this.handleSubmit }>
            <div className="mb-3">
              <label htmlFor="pseudo" className="form-label">Pseudo</label>
              <input 
                type="text" 
                className={ `form-control ${this.state.errors.pseudo ? 'is-invalid' : ''}` }
                id="pseudo" 
                onChange={ this.handlePseudoChange }
              />
              { this.state.errors.pseudo ? <div className="text-danger">{ this.state.errors.pseudo }</div> : '' }
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Adresse email</label>
              <input 
                type="email" 
                className={ `form-control ${this.state.errors.email ? 'is-invalid' : ''}` }
                name="email" 
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
                name="password" 
                id="password" 
                onChange={ this.handlePasswordChange } 
              />
              { this.state.errors.password ? <div className="text-danger">{ this.state.errors.password }</div> : '' }
            </div>
            <div className="mb-3">
              <label htmlFor="password_confirmation " className="form-label">Confirmation du mot de passe</label>
              <input 
                type="password" 
                className={ `form-control ${this.state.errors.password ? 'is-invalid' : ''}` } 
                name="password_confirmation" 
                id="password_confirmation " 
                onChange={ this.handlePasswordConfirmationChange } 
              />
              { this.state.errors.password ? <div className="text-danger">{ this.state.errors.password }</div> : '' }
            </div>
            <button type="submit" className="btn btn-primary">M'inscrire</button>
          </form>
        </div>
      </>
    )
  }
}

export default Register
