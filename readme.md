# General Assembly SEI Project 2: MovieBored
## Introduction
The second project of the course was pair-code a React application that consumed a public API.

We chose to recreate a movie database website.


## Team
Shane - [shaneshibu · GitHub](https://github.com/shaneshibu) <br />
Charles - [CPrich905 · GitHub](https://github.com/CPrich905)

## Technologies used
* HTML5
* SCSS and Bulma
* JavaScript (ECMAScript6)
* React.js
* Git
* GitHub
* The Movie Database API

## Dependencies
* Axios

## Timeframe
2 Days (May 2019)

## Deployment
The project is currently deployed at https://tmdb2.herokuapp.com/

## Overview
Having decided to use th API from themoviedb.org, we set about recreating an IMDB-type website where users could navigate to a movie page by searching for its name.. Our intention was to create a simple layout showing cast, crew, reviews, similar films and associated media.

![tmdb2 Main Screen](src/assets/homepage.gif)

## Wins
- Dynamically changin the background image of the Hero div
Setting the initial image was relatively simple, we just set the css style of backgroundImage equal to the url of the first image of that movies background images array. However if multiple images were included with the API return, we also wanted to showcase these. For films with multiple images, we used to code below to take the provided array of images from the API and cycle through them, adding a time out to smooth the change over (see code below).

![Alt text](./dist/assets/readme/setbackground.png?raw=true "Title")

## Challenges
 - The one major challenge we faced was working with multiple axios Get requests. Having to work with several asynchronous functions delayed loading times which often led to problems displaying items on the page when the variables that contained those items where still empty. We got around this problem by using conditional rendering. This way JSX elements that needed data from the API would only be rendered after the request had been completed and the data stored in the React state.

```javascript
render() {
  return(

    <section>
      <div className="hero is-dark is-fullheight-with-navbar is-paddingless">
        {this.state.heroLoaded &&
          <MoviesHero movie={this.state.movie}/>}
      </div>
      <hr />
      <div className="content">
  )
}
```
In this case the MoviesHero component would only render if the heroLoaded object was a truthy value, i.e. not equal to null.

- Displaying the cast  
While cast and recommended movies were provided by our API, not all of the cast profiles or recommended films had an associated image. Without these images, the formatting for the scroll bars we wished to use became irregular, necessitating the use of a placeholder image.
Both cast and recommendations were built using a functional component with cast and recommendations passed from the main show page. The class component for the cast is shown below.

![Alt text](./dist/assets/readme/cast.png?raw=true "Title")


## Future development
While we completed our Minimum Viable Product of a films database, we had hoped to include a similar process for TV listings and this would be our first goal.

Subsequent features could include an option for users to create a profile, saving data such as favourite actors and films, recommended viewings etc.
