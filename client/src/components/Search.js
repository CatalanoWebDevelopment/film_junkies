import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import MovieThumb from './MovieThumb';
import searchIcon from '../img/search.png';
import '../App.scss';

class Search extends Component {
    state = { 
        query: "",
        results: []
    };

    getMovies = async (searchInput) => {
        const response = await fetch(`/api/getMoviesSearch/?query=${searchInput}`);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    handleOnChangeEvent = event => {
        this.setState({
            query: event.target.value
        }, () => {
            this.getMovies(this.state.query).then(res => {
                this.setState({
                    results: res.response.results
                });
            })
            .catch(error => console.error(error));
        });
    };

    render() {
        return (
            <section className="search-wrapper">
                <Container>
                    <Row>
                        <Col>
                            <div className="search-bar">
                                <input type="text" placeholder="Search..." className="search-input" value={this.state.query} onChange={this.handleOnChangeEvent} />
                                <img src={searchIcon} alt="" className="search-icon" />
                            </div>
                        </Col>
                    </Row>

                    {(this.state.query && this.state.results) && (this.state.query.length > 0 && this.state.results.length === 0) && <Row className="search-prefix">
                        <Col>
                            <h2 className="text-left">Search results for "{this.state.query}"</h2>
                        </Col>
                    </Row>}

                    {this.state.results && this.state.query.length > 0 && <Row className="search-results">
                        {this.state.results.map((movie) => {
                            return <MovieThumb key={movie.id} id={movie.id} name={movie.original_title} voteRating={movie.vote_average} date={movie.release_date} baseUrl={this.props.baseUrl} smPosterSize={this.props.smPosterSize} posterPath={movie.poster_path} goToPage={this.props.goToPage} />
                        })}    
                    </Row>}
                </Container>
            </section>
        );
    };
};

export default Search;