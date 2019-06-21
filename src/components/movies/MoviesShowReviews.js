import React from 'react'

const MoviesShowReviews = ({ reviews, reviewNumber, moveReview }) => (
  <section className="section">
    <div className="container">
      <h4 className="subtitle">Reviews</h4>
      <div className="review-master columns">
        {/* <div className="column "> */}
        <div id="left" className="column is-1" onClick={moveReview}>Previous review
        </div>
        <div id="centre" className="column is-10">
          <p>{reviews[reviewNumber].content}</p>
        </div>
        <div id="right" className="right column is-1" onClick={moveReview}>Next review
        </div>
        {/* </div> */}
      </div>
    </div>
    <hr />
  </section>
)

export default MoviesShowReviews
