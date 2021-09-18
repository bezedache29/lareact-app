import axios from 'axios'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Navbar from '../partials/Navbar'
import AppLoader from '../loader/AppLoader'

export class ShowPicture extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      apiUrl: 'http://api.lareact.test/api/pictures/',
      picture: {},
      errors: [],
      redirect: false
    }
  }

  componentDidMount() {
    // Check si session ouverte
    if (sessionStorage.getItem('token')) {
      const id = this.props.match.params.id
      let headers = {
        headers: {
          'API-TOKEN': sessionStorage.getItem('token')
        }
      }

      // Requete sur l'API
      axios.get(this.state.apiUrl + id, headers)
      .then(res => {
        this.setState({ picture: res.data }, () => {
          console.log(this.state.picture);
        })
      })
      .catch(error => {
        if (error.response.status === 404) {
          this.setState({ errors: 'Photo introuvable' }, () => {
            console.log(this.state.errors)
          })
        }
        console.log(error.response)
      })
    } else {
      this.setState({ redirect: true })
    }
  }
  
  render() {

    if (this.state.redirect) {
      return <Redirect to="/" />
    }

    return (
      <>
        <Navbar />

        <div className="container my-5">
          {
            this.state.picture && this.state.picture.user
            ?
            <div className="row">
              <div className="col-6">
                <img className="img-fluid" src={`http://api.lareact.test/storage/${ this.state.picture.image }`} alt="" />
              </div>
              <div className="col-6">
                <div className="author">
                  <h2>{ this.state.picture.title }</h2>
                  <p>{ this.state.picture.description }</p>
                  <h4>Auteur : <span class="badge bg-secondary">{ this.state.picture.user.pseudo }</span></h4>
                </div>
              </div>
            </div>
            :
            <div className="text-center">
              <AppLoader />
            </div>
          }
        </div>
      </>
    )
  }
}

export default ShowPicture
