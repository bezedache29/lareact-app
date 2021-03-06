import axios from 'axios'
import React, { Component } from 'react'
import Navbar from '../partials/Navbar'
import { Redirect } from 'react-router-dom'

export class CreatePicture extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       title: "",
       description: "",
       image: "",
       errors: [],
       redirect: false
    }
  }

  handleTitleChange = event => {
    this.setState({ title: event.target.value }, () => {
      console.log(this.state)
    })
  }

  handleDescriptionChange = event => {
    this.setState({ description: event.target.value }, () => {
      console.log(this.state)
    })
  }

  handleImageChange = event => {
    this.setState({ image: event.target.files[0] }, () => {
      console.log(this.state)
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    
    let bodyFormData = new FormData()
    bodyFormData.set('title', this.state.title)
    bodyFormData.set('description', this.state.description)
    bodyFormData.set('image', this.state.image)

    let headers = {
      headers: {
        'API-TOKEN': sessionStorage.getItem('token')
      }
    }

    axios.post('https://lareact-api.ripley.eu/api/pictures', bodyFormData, headers)
      .then(res => {
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
          <h2 className="my-3 text-center">Ajouter un article</h2>
          <form method="POST" onSubmit={ this.handleSubmit } encType="multipart/form-data">
          
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Titre de l'article</label>
              <input 
                type="text" 
                className={ `form-control ${this.state.errors.title ? 'is-invalid' : ''}` } 
                id="title"
                onChange={ this.handleTitleChange }
              />
              { this.state.errors.title ? <div className="text-danger">{ this.state.errors.title }</div> : '' }
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description de l'article'</label>
              <textarea 
                id="description" 
                cols="30" 
                rows="10" 
                onChange={ this.handleDescriptionChange }
                className={ `form-control ${this.state.errors.description ? 'is-invalid' : ''}` }
              ></textarea>
              { this.state.errors.description ? <div className="text-danger">{ this.state.errors.description }</div> : '' }
            </div>

            <div class="mb-3">
              <label for="image" class="form-label">Choisissez votre image</label>
              <input 
              className={ `form-control ${this.state.errors.image ? 'is-invalid' : ''}` }
              onChange={ this.handleImageChange }
              type="file" 
              id="image"
              />
              { this.state.errors.image ? <div className="text-danger">{ this.state.errors.image }</div> : '' }
            </div>
            
            <button type="submit" className="btn btn-primary">Cr??er l'article</button>
            
          </form>
        </div>
      </>
    )
  }
}

export default CreatePicture
