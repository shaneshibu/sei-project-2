import React from 'react'
// import axios from 'axios'



class Home extends React.Component {
  constructor(){
    super()

    this.state = { searchString: '' }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange({ target: { value }}) {
    const searchString = value
    this.setState({ searchString })

  }

  handleSubmit(e) {
    e.preventDefault()
    const query = this.state.searchString.replace(/ /g, '+')
    this.props.history.push(`search/${query}`)

  }

  render() {
    console.log()
    return(
      <section className="section">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              className="input"
              onChange={this.handleChange}
              value={this.state.searchString}
            />
          </form>
        </div>
      </section>
    )
  }
}

export default Home
