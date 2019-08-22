# SEI - 41 - PAIR CODING
## Brief
The second project of the course was pair-code a React application that consumed a public API.

## Technical Requirements
Consume a public API <br />
Have several components, at least one functional and one classical <br />
Can include a router <br />
Include wire frames <br />
Have semantically clean HTML <br />

## Deliverables
A working app <br />
A git repository on Github <br />
This Readme!

## Team
Shane - [shaneshubu · GitHub](https://github.com/shaneshibu) <br />
Charles - [CPrich905 · GitHub](https://github.com/CPrich905)

## Technologies used
* HTML5
* SCSS and Bulma
* JavaScript (ECMAScript6)
* React.js
* GitHub

## Dependencies
* Axios

## Our Approach
With only two days for this pair coded project, our key constraint was time and how long it would take for an API key. Having identified themoviedb.org , we set about recreating an IMDB-type webpage. Our intention was to create a simple layout showing cast, crew, similar films and associated media.

## Future development
While we completed our Minimum Viable Product of a films database, we had hoped to include a similar process for TV listings and this would be our first goal.

Subsequent features could include an option for users to create a profile, saving data such as favourite actors and films, recommended viewings etc.

## Major hurdles
Our two greatest hurdles came in the cycling of hero images behind the main display, and the spacing of cast and recommended movies.

###  Background Image
Setting the initial image was  relatively simple, however if multiple images were included with the API return, we also wanted to showcase these. For films with multiple images, we used to code below to take the provided array of images from the API and cycle through them, adding a time out to smooth the change over.

![Alt text](./dist/assets/readme/cast.png?raw=true "Title")

### Cast and Movies
While cast and recommended movies were provided by our API, not all of the cast profiles or recommended films had an associated image. Without these images, the formatting for the scroll bars we wished to use became irregular, necessitating the use of a placeholder image.
Both cast and recommendations were built using a functional component with cast and recommendations passed from the main show page. The class component for the cast is shown below.
