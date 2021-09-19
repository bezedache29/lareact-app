import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Navbar from './partials/Navbar'

export class Home extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       pictures: [],
       search: ""
    }
  }

  componentDidMount() {
    axios.get('https://lareact-api.ripley.eu/api/pictures')
      .then(res => {
        this.setState({ pictures: res.data })
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  handleSearchChange = event => {
    this.setState({ search: event.target.value }, () => {

      // On fait les requètes sur l'API a parti de 3 lettres
      if (this.state.search.length > 3) {
        this.getArticles()
      }
      
      // Au clic sur la croix dans l'input on recharge les articles
      if (this.state.search === '') {
        this.getArticles()
      }
    })
  }

  handleSubmit = event => {
    event.preventDefault()
  }

  getArticles = () => {
    let bodyFormData = new FormData()
    bodyFormData.set('search', this.state.search)

    axios.post('https://lareact-api.ripley.eu/api/pictures/search', bodyFormData)
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
          <div className="d-flex justify-content-center mt-5 mb-3">
            <form className="form-inline my-2 my-lg-0 mx-2" method="POST" onSubmit={ this.handleSubmit } >
              <input 
                type="search" 
                className="form-control me-sm-2"
                name="search" 
                placeholder="Rechercher un article..." 
                onChange={ this.handleSearchChange}
              />
            </form>
          </div>
          <div className="row mt-3 justify-content-between">
            {
              this.state.pictures.map(picture => {
                return (
                  <div className="col-4" key={ picture.id }>
                    <div className="card mx-2 my-3" style={{ minHeight: "600px" }}>
                      <img src={ `https://lareact-api.ripley.eu/storage/${picture.image}` } className="card-img-top" alt="..." />
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

export default Home
