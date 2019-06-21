import React from 'react'
// import axios from 'axios'



class Home extends React.Component {
  constructor(){
    super()

    this.state = { searchString: '' }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.selectRadio = this.selectRadio.bind(this)
  }

  selectRadio(e) {
    this.setState({ radio : e.target.id })
  }

  handleChange({ target: { value }}) {
    const searchString = value
    this.setState({ searchString })

  }

  handleSubmit(e) {
    e.preventDefault()
    console.log(e.target)
    const query = this.state.searchString.replace(/ /g, '+')
    if (this.state.radio==='TV') {
      this.props.history.push(`search/tv/${query}`)
    } else {
      this.props.history.push(`search/movies/${query}`)
    }

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
              placeholder="Pick a film"
            />
            <div className="control">
              <label className="radio">
                <input type="radio" id="TV" onClick={this.selectRadio}/>
                TV
              </label>
              <label className="radio">
                <input type="radio" id="Movies" onClick={this.selectRadio}/>
                Movies
              </label>
            </div>
          </form>
        </div>
      </section>
    )
  }
}

export default Home
