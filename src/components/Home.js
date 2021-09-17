import axios from 'axios'
import React, { Component } from 'react'

import Navbar from './partials/Navbar'

export class Home extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       pictures: []
    }
  }

  componentDidMount() {
    axios.get('http://api.lareact.test/api/pictures')
      .then(res => {
        this.setState({ pictures: res.data })
      })
      .catch(error => {
        console.log(error.message)
      })
  }
  
  render() {
    return (
      <>
        <Navbar />

        <div className="container">
          <div className="row mt-3 justify-content-between">
            {
              this.state.pictures.map(picture => {
                return (
                  <div class="col-4">
                    <div className="card mx-2 my-3">
                      <img src={ `http://api.lareact.test/storage/${picture.image}` } class="card-img-top" alt="..." />
                      <div class="card-body">
                        <h5 class="card-title">{ picture.title }</h5>
                        <p class="card-text">{ picture.description }</p>
                        <a href="#" class="btn btn-primary">En savoir plus</a>
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
