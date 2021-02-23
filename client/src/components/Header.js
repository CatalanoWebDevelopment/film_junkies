import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';
import { Container, Row, Col } from 'reactstrap';
import '../App.scss';

const Header = props => {
    return (
        <header className="App-header">
            <Container>
                <Row className="header-wrapper">
                    <Col className="logo-col" lg={6}>
                        <Link to={"/"}>
                            <img src={logo} alt="The Movie Database Logo" className="pointer logo-img" />
                        </Link>
                    </Col>
                </Row>
            </Container>
        </header>
    );
};

export default Header;