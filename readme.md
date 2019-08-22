# SEI - 41 - PAIR CODING
## Brief
The second project of the course was pair-code a React application that consumed a public API.

## Technical Requirements
Consume a public API
Have several components, at least one functional and one classical
Can include a router
Include wire frames
Have semantically clean HTML

## Deliverables
A working app
A git repository on Github
This Readme!

## Team
Shane - [shaneshubu · GitHub](https://github.com/shaneshibu)
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
Once completing the main movie site, we were quickly able to include TV listings as well, which was our secondary priority and exceeded our Minimum Viable Product of a films database.

With our main focus on functionality, we both agreed that

While we are not planning on taking this app further at this time, future developments could include an option for users to create a profile, saving data such as favourite actors and films, recommended viewings etc.

## Major hurdles
Our two greatest hurdles came in the cycling of hero images behind the main display, and the spacing of cast and recommended movies.

###  Background Image
Setting the initial image was  relatively simple. For films with multiple images, we used to code below to take the provided array of images from the API and cycle through them. In order to smooth the speed of the change over, we also added a Timeout.
[image:220F5C41-9759-43EC-BCAE-B5BEC537FB9E-733-0000F5771BE05B6A/1536631B-C018-4FDF-9EAB-CCFEDE2A300B.png]

### Cast and Movies
While cast and recommended movies were provided by our API, not all of the cast profiles or recommended films had an associated image. Without these images, the formatting for the scroll bars we wished to use became irregular, necessitating the use of a placeholder image.
Both cast and recommendations were built using a functional component with cast and recommendations passed from the main show page. The class component for the cast is shown below.

[image:E30EA5AC-E59E-4211-A66D-36C1C8D92319-733-0000F6C58B2AFBB9/CCBB4568-AB01-49D2-95A2-FCD03A96862E.png]
