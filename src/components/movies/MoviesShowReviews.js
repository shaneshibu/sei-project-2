import React from 'react'

const MoviesShowReviews = ({ reviews, reviewNumber, moveReview }) => (

  <div className="container">
    {reviews && !!reviews.length && <div>
      { reviews && <h4 className="subtitle has-text-weight-bold">Reviews ({reviewNumber+1}/{reviews.length})</h4>}
      <div className="review-master columns">
        <div id="left" className="column is-1 review-arrow" onClick={moveReview}>
          <i className="fas fa-arrow-left"></i>
        </div>
        {reviews && reviews[reviewNumber] && <div id="centre" className="column is-10">
          <p>{reviews[reviewNumber].content}</p>
        </div>}
        <div id="right" className="column is-1 review-arrow" onClick={moveReview}>
          <i className="fas fa-arrow-right"></i>
        </div>
      </div>
      <hr />
    </div>}
  </div>
)

export default MoviesShowReviews
