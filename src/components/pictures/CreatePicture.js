import axios from 'axios'
import React, { Component } from 'react'
import Navbar from '../partials/Navbar'

export class CreatePicture extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       title: "",
       description: "",
       image: "",
       errors: []
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

    axios.post('http://api.lareact.test/api/pictures', bodyFormData, headers)
      .then(res => {
        console.log(res.data)
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
    return (
      <>
        <Navbar />
        
        <div className="w-50 mx-auto">
          <h2 className="my-3 text-center">Ajouter une photo</h2>
          <form method="POST" onSubmit={ this.handleSubmit } encType="multipart/form-data">
          
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Titre de la photo</label>
              <input 
                type="text" 
                className={ `form-control ${this.state.errors.title ? 'is-invalid' : ''}` } 
                id="title"
                onChange={ this.handleTitleChange }
              />
              { this.state.errors.title ? <div className="text-danger">{ this.state.errors.title }</div> : '' }
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description de la photo</label>
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
            </div>
            
            <button type="submit" className="btn btn-primary">Ajouter l'image</button>
            
          </form>
        </div>
      </>
    )
  }
}

export default CreatePicture
