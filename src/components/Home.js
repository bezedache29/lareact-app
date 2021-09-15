import React, { Component } from 'react'

import Navbar from './partials/Navbar'

export class Home extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  
  render() {
    return (
      <>
        <Navbar />

        <div class="h-100 p-5 text-white bg-dark rounded-3 m-2">
          <h2>Change the background</h2>
          <p>Swap the background-color utility and add a `.text-*` color utility to mix up the jumbotron look. Then, mix and match with additional component themes and more.</p>
          <button class="btn btn-outline-light" type="button">Example button</button>
        </div>
      </>
    )
  }
}

export default Home
