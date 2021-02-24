import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import '../App.scss';

const FourZeroFour = () => {
    return (
        <div className="fourzerofour-wrapper align-items-center d-flex">
            <Container>
                <Row>
                    <Col className="text-center">
                        <h3 className="fourzerofour-heading mt-5">
                            Oops! Looks like that page doesn't exist.
                        </h3>
                        <h4>
                            <Link to={"/"}>Let's go back to the home page and try it again</Link>
                        </h4>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default FourZeroFour;