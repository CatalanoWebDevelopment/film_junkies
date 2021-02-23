import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import backArrow from '../img/back-arrow.png';
import { format } from 'date-fns';
import Spinner from './Spinner';
import '../App.scss';

class MoviePage extends Component { 
    state = {
        configuration: "",
        movieInfo: ""
    };

    componentDidMount() {
        const movieId = this.props.match.params.movieid;
        this.getConfiguration().then(res => {
            this.setState({
                configuration: res.response
            }, () => {
                this.getMovie(movieId).then(res => {
                    this.setState({
                        movieInfo: res.response
                    });
                });
            });
        });
    };

    getConfiguration = async () => {
        const response = await fetch(`/api/getConfiguration`);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    getMovie = async (id) => {
        const response = await fetch(`/api/getMovie/?id=${id}`);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    getRuntimeInHoursAndMinutes = mins => {
        const hours = Math.floor(parseInt(mins) / 60);
        const minutesRemaining = (mins - (hours * 60));
        return <span>{hours}hr {minutesRemaining}mins</span>;
    };

    goBack = () => {
        this.props.history.goBack();
    };

    render() {
        const movieId = this.props.match.params.movieId;

        if (this.state.moveInfo === "") {
            // Loading Screen
            return (
                <div className="movie-page-wrapper">
                    <Container>
                        <Row>
                            <Col>
                                <Spinner />
                                <p className="text-center">Loading Movie Information...</p>
                            </Col>
                        </Row>
                    </Container>
                </div>
            );
        };

        const { base_url, original_title, overview, release_date, runtime } = this.state.movieInfo; 
        const RuntimeDisplay = () => this.getRuntimeInHoursAndMinutes(runtime);
        const ratingPercent = this.state.movieInfo.vote_average * 10;
        const yearDisplay = format(release_date.replace("-", "/"), "YYYY");
    
        // All Commmon Background and Poster Sizes
        const smBgSize = this.state.configuration.images.backdrop_sizes[0];
        const mdBgSize = this.state.configuration.images.backdrop_sizes[1];
        const lgBgSize = this.state.configuration.images.backdrop_sizes[2];
        const smPosterSize = this.state.configuration.images.poster_sizes[2];
        const mdPosterSize = this.state.configuration.images.poster_sizes[3];
        const lgPosterSize = this.state.configuration.images.poster_sizes[4];
        const xlPosterSize = this.state.configuration.images.poster_sizes[5];

        // Define Background Size 
        const bgUrl = this.state.movieInfo.backdrop_path;
        const bgImage = base_url + lgBgSize + bgUrl;
        const movieBg = {
            backgroundImage: `url(${bgImage})`,
        };

        // Define Poster Size
        const posterUrl = this.state.movieInfo.poster_path;
        const posterImg = posterUrl === null ? "https://via.placeholder.com/342x513.png?text=No+Poster+Available" : base_url + mdPosterSize + posterUrl;

        return(
            <div className="movie-page-wrapper">
                <div className="movie-header-wrapper" style={movieBg}>
                    <img src={backArrow} alt="Back to Homepage" className="movie-back-arrow pointer" onClick={() => { this.goBack() }} />
                    <Container className="d-none d-md-block">
                        <Row>
                            <Col>
                                <h1 className="movie-pg-desktop-title">{original_title}</h1>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <Container fluid={true} className="d-none d-md-block desktop-movie-details">
                    <Container>
                        <Row>
                            <Col>
                                <p className="mb-0">
                                    {yearDisplay}
                                    <span className="details-divider">|</span>
                                    {ratingPercent}% Overall Viewer Rating
                                    <span className="details-divider">|</span>
                                    <RuntimeDisplay />
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </Container>

                <Container className="d-md-none">
                    <Row>
                        <Col xs={5} className="d-md-none">
                            <img src={posterImg} alt={original_title + " poster image"} className="img-fluid movie-pg-poster" />
                        </Col>

                        <Col xs={7} md={12}>
                            <h2 className="movie-pg-title">{original_title}</h2>
                            <div className="movie-details">
                                <p>{yearDisplay} &middot; {ratingPercent}% Overall Viewer Rating</p>
                                <p><RuntimeDisplay /></p>
                            </div>
                        </Col>
                    </Row>
                </Container>

                <Container className="pb-5">
                    <Row className="d-md-none">
                        <Col>
                            <hr className="movie-pg-section-divider" />
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} md={8} lg={9}>
                            <h3 className="movie-overview-title">Overview</h3>
                            <p className="movie-description">{overview}</p>
                        </Col>

                        <Col md={4} lg={3} className="d-none d-md-block">
                            <img src={posterImg} alt={original_title + " poster image"} className="img-fluid movie-pg-poster" />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    };
};

export default MoviePage;