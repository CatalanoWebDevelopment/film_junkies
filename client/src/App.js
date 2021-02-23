import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import PopularMovies from './components/PopularMovies';
import Header from './components/Header';
import Search from './components/Search';
import './App.scss';

class App extends Component { 
  state = {
    movies: [],
    page: 1,
    configuration: null
  };

  componentDidMount() {
    this.getConfiguration().then(res => {
      this.setState({
        configuration: res.response
      });
    })
    .catch(error => console.error(error));
  };

  getConfiguration = async () => {
    const response = await fetch(`/api/getConfiguration`);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  goToPage = page => {
    this.props.history.push(page);
  };

  render() {
    return (
      <BrowserRouter>
        <div className="app-wrapper">
          <Header />
          {this.state.configuration !== null && <React.Fragment>
            <Search baseUrl={this.state.configuration.images.secure_base_url} smPosterSizer={this.state.configuration.images.poster_sizes[3]} goToPage={this.goToPage} />
            <PopularMovies baseUrl={this.state.configuration.images.secure_base_url} smPosterSizer={this.state.configuration.images.poster_sizes[3]} goToPage={this.goToPage} />
          </React.Fragment>}
        </div>
      </BrowserRouter>
    );
  };
};

export default App;