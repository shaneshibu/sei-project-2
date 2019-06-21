import React from 'react'

const MoviesShowReviews = ({ reviews, reviewNumber, moveReview }) => (
  <section className="section">
    <div className="container">
      <h4 className="subtitle">Reviews ({reviewNumber+1}/{reviews.length})</h4>
      <div className="review-master columns">
        {/* <div className="column "> */}
        <div id="left" className="column is-1 review-arrow" onClick={moveReview}>
          <i className="fas fa-arrow-left"></i>
        </div>
        <div id="centre" className="column is-10">
          <p>{reviews[reviewNumber].content}</p>
        </div>
        <div id="right" className="column is-1 review-arrow" onClick={moveReview}>
          <i className="fas fa-arrow-right"></i>
        </div>
        {/* </div> */}
      </div>
    </div>
    <hr />
  </section>
)

export default MoviesShowReviews
