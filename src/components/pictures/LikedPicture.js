import axios from 'axios'
import React, { Component } from 'react'
import Navbar from '../partials/Navbar'
import { Link } from 'react-router-dom'

export class LikedPicture extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       search: '',
       pictures: []
    }
  }

  componentDidMount() {
    this.getArticlesLiked()
  }

  handleSearchChange = event => {
    this.setState({ search: event.target.value }, () => {

      // Au clic sur la croix dans l'input on recharge les articles
      if (this.state.search === '') {
        this.getArticlesLiked()
      }

    })
  
    if (this.state.search === '') {
      this.getArticlesLiked()
    }
  }

  handleSubmit = event => {
    event.preventDefault()

    this.getArticles()
  }

  getArticlesLiked = () => {
    let headers = {
      headers: {
        'API-TOKEN': sessionStorage.getItem('token')
      }
    }

    axios.get('http://api.lareact.test/api/pictures/search-liked-articles', headers)
      .then(res => {
        this.setState({ pictures: res.data})
      })
      .catch(error => {
        console.log(error.response)
      })
  }

  getArticles = () => {
    let headers = {
      headers: {
        'API-TOKEN': sessionStorage.getItem('token')
      }
    }

    let bodyFormData = new FormData()
    bodyFormData.set('search', this.state.search)

    axios.post('http://api.lareact.test/api/pictures/search-liked-articles', bodyFormData, headers)
      .then(res => {
        this.setState({ pictures: res.data })
      })
      .catch(error => {
        console.log(error.response)
      })
  }
  
  render() {
    return (
      <>
        <Navbar />

        <div className="container">
          <h2 className="my-3 text-center">Les articles que j'ai aimés</h2>

          <div className="d-flex justify-content-center mt-5 mb-3">
            <form className="form-inline my-2 my-lg-0 mx-2" method="POST" onSubmit={ this.handleSubmit } >
              <input 
                type="search" 
                className="form-control me-sm-2"
                name="search" 
                placeholder="Rechercher un article..." 
                onChange={ this.handleSearchChange }
              />
            </form>
          </div>
          <div className="row mt-3 mx-auto">
            {
              this.state.pictures.map(picture => {
                return (
                  <div className="col-4" key={ picture.id }>
                    <div className="card mx-2 my-3" style={{ minHeight: "600px" }}>
                      <img src={ `http://api.lareact.test/storage/${picture.image}` } className="card-img-top" alt="..." />
                      <div className="card-body row flex-column">
                        <h5 className="card-title">{ picture.title }</h5>
                        <p className="card-text text-truncate">{ picture.description }</p>
                        <div className="mt-auto">
                          <Link to={`/pictures/${picture.id}`} className="btn btn-primary">En savoir plus</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </>
    )
  }
}

export default LikedPicture
