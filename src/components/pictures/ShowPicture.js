import axios from 'axios'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Navbar from '../partials/Navbar'
import AppLoader from '../loader/AppLoader'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import { Favorite } from '@material-ui/icons'
import { CSSTransition } from 'react-transition-group'
import Modal from 'react-modal'

export class ShowPicture extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      apiUrl: 'http://api.lareact.test/api/pictures/',
      picture: {},
      errors: [],
      redirect: false,
      like: false,
      showMessage: false,
      showContainer: true,
      isOpen: false
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

  toggleModal = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  };
  
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

                  <button className="btn btn-info my-2" onClick={ this.toggleModal }>Voir les personnes ayant liké cet article</button>

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
              <CSSTransition
                in={ this.state.isOpen }
                timeout={300}
                classNames="alert"
                unmountOnExit
                onEnter={() => this.setState({ showContainer: false })}
                onExited={() => this.setState({ showContainer: true })}
              >
                <Modal
                  closeTimeoutMS={500}
                  isOpen={ this.state.isOpen }
                >
                  <div className="">
                    <button type="button" class="btn-close float-end me-2" aria-label="Close" onClick={ this.toggleModal }></button>
                    <h2 className="text-center">Personnes ayant aimé cet article :</h2>
                    <ul class="list-group mt-5 w-50 mx-auto">
                      <li class="list-group-item">An item</li>
                      <li class="list-group-item">A second item</li>
                      <li class="list-group-item">A third item</li>
                      <li class="list-group-item">A fourth item</li>
                      <li class="list-group-item">And a fifth one</li>
                    </ul>
                  </div>
                </Modal>
              </CSSTransition>
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
