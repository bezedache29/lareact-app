import axios from 'axios'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Navbar from '../partials/Navbar'
import AppLoader from '../loader/AppLoader'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import { Favorite } from '@material-ui/icons'

export class ShowPicture extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      apiUrl: 'https://lareact-api.ripley.eu/api/pictures/',
      picture: {},
      errors: [],
      redirect: false,
      like: false,
      users: []
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
          this.checkLike()
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

  checkLike = () => {
    let headers = {
      headers: {
        'API-TOKEN': sessionStorage.getItem('token')
      }
    }

    axios.get(this.state.apiUrl + this.props.match.params.id +'/checklike', headers)
      .then(res => {
        this.setState({ like: res.data })
      })
      .catch(error => {
        console.log(error.response)
      })
  }

  handleLike = () => {
    let headers = {
      headers: {
        'API-TOKEN': sessionStorage.getItem('token')
      }
    }

    axios.get(this.state.apiUrl + this.props.match.params.id +'/handlelike', headers)
      .then(res => {
        this.checkLike()
      })
      .catch(error => {
        console.log(error.response)
      })
  }

  usersLiked = () => {
    let headers = {
      headers: {
        'API-TOKEN': sessionStorage.getItem('token')
      }
    }

    axios.get(this.state.apiUrl + this.props.match.params.id +'/usersLiked', headers)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error.response)
      })
  }

  serchUsersLiked = () => {
    let headers = {
      headers: {
        'API-TOKEN': sessionStorage.getItem('token')
      }
    }

    axios.get(this.state.apiUrl + this.props.match.params.id +'/users-liked-articles', headers)
      .then(res => {
        this.setState({ users: res.data })
      })
      .catch(error => {
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

        <div className="container my-5">
          {
            this.state.picture && this.state.picture.user
            ?
            <div className="row">
              <div className="col-6">
                <img className="img-fluid" src={`https://lareact-api.ripley.eu/storage/${ this.state.picture.image }`} alt="" />
              </div>
              <div className="col-6">
                <div className="author">
                  <h2>{ this.state.picture.title }</h2>

                  <button 
                    type="button" 
                    className="btn btn-primary my-4" 
                    data-bs-toggle="modal" 
                    data-bs-target="#usersLikedPicture"
                    onClick={ this.serchUsersLiked }
                  >
                    Voir les personnes ayant liké cet article
                  </button>

                  <p>{ this.state.picture.description }</p>
                  <h4>Auteur : <span className="badge bg-secondary">{ this.state.picture.user.pseudo }</span></h4>
                  {
                    this.state.like
                    ?
                    <>
                      <Favorite onClick={ this.handleLike } style={{ cursor: 'pointer' }} /> Je n'aime plus
                    </>
                    :
                    <>
                      <FavoriteBorder onClick={ this.handleLike } style={{ cursor: 'pointer' }} /> J'aime
                    </>
                  }
                </div>
              </div>

              {/* Modal */}
              <div className="modal fade" id="usersLikedPicture" tabIndex="-1" aria-labelledby="usersLikedPictureLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="usersLikedPictureLabel">Liste des personnes ayant aimé cet article</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      {
                        this.state.users
                        ?
                        <ul>
                          { 
                            this.state.users.map(user => {
                              return (
                                  <li key={user.id}>{ user.pseudo }</li>
                              )
                            })
                          }
                        </ul>
                        :
                        <div className="text-center">
                          <AppLoader />
                        </div>
                      }
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Fermer</button>
                    </div>
                  </div>
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
