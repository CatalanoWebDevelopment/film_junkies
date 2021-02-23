import React from 'react';
import { Col } from 'reactstrap';
import '../App.scss';

const MovieThumb = props => {
    console.log("URL", props.baseUrl + props.smPosterSize + props.posterPath)
    const posterImage = props.posterPath === null ? "https://via.placeholder.com/342x513.png?text=No+Poster+Available" : props.baseUrl + props.smPosterSize + props.posterPath;
    const { name, date } = props;
    const ratingPercent = props.voteRating * 10;
    const RatingBadge = () => {
        if (ratingPercent > 79) {
            return <span className="rating-badge high-rating">{ratingPercent}%</span>
        } else if (ratingPercent > 49 && ratingPercent < 80) {
            return <span className="rating-badge medium-rating">{ratingPercent}%</span>
        } else {
            return <span className="rating-badge low-rating">{ratingPercent}%</span>
        };
    };

    return (
        <Col xs={6} md={4} lg={3} className="movie-thumb--wrapper pointer" onClick={() => { props.goToPage("/movie/" + encodeURIComponent(name) + "/" + props.id) }}>
            <div className="thumb-img-wrapper">
                <img src={posterImage} alt={name + " Poster"} className="img-fluid movie-thumb-img" />
                <RatingBadge />
            </div>

            <p className="movie-name">{name}</p>
            <p className="release-date">{date}</p>
        </Col>
    ); 
};

export default MovieThumb;