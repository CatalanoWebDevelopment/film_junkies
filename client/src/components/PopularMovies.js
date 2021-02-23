import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../App.scss';
import MovieThumb from './MovieThumb';
import Spinner from './Spinner';

class PopularMovies extends Component {
    state = {
        movies: [],
        page: 1
    };

    getPopularMovies = async (pageNumber) => {
        const response = await fetch(`/api/getPopularMovies/?pagenumber=${pageNumber}`);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    setPopularMovies = (pageNumber="1") => {
        this.getPopularMovies(pageNumber).then(res => {
            console.log(res)
            this.setState({
                movies: res.response.results,
                page: res.response.page
            })
        })
        .catch(error => console.error(error));
    };

    componentDidMount() {
        this.setPopularMovies();
    };

    render() {
        if (this.state.movies.length === 0) {
            return (
                <Container>
                    <Row>
                        <Col>
                            <Spinner />
                            <p className="text-center">Loading Popular Movies...</p>
                        </Col>
                    </Row>
                </Container>
            );
        } else {
            return (
                <div className="popular-wrapper">
                    <Container>
                        <Row>
                            <Col className="d-flex justify-content-between section-title-row">
                                <h2>Popular Movies</h2>
                                <span>Page: {this.state.page}</span>
                            </Col>
                        </Row>

                        <Row>
                            {this.state.movies.map((movie => {
                                return <MovieThumb key={movie.id} id={movie.id} name={movie.original_title} voteRating={movie.vote_average} date={movie.release_date} baseUrl={this.props.baseUrl} smPosterSize={this.props.smPosterSize} posterPath={movie.poster_path} goToPage={this.props.goToPage} />
                            }))}
                        </Row>

                        <Row className="navigation-row">
                            <Col>
                                {this.state.page !== 1 && <button className="primary-btn prev-btn pointer" onClick={() => this.setPopularMovies(this.state.page - 1)}>Previous Page</button>}
                                <button className="primary-btn next-btn pointer" onClick={() => this.setPopularMovies(this.state.page + 1)}>Next Page</button>
                            </Col>
                        </Row>
                    </Container>
                </div>
            );
        };
    };
};

export default PopularMovies;