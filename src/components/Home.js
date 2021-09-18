import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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

export default Home
