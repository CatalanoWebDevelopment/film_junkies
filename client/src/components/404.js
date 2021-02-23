import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import '../App.scss';

const FourZeroFour = () => {
    return (
        <div className="404-wrapper">
            <Container>
                <Row>
                    <Col className="text-center">
                        <h3 className="404-heading mt-5">
                            Oops! Looks like that page doesn't exist. <Link to={"/"}>Let's go back to the home page and try it again</Link>
                        </h3>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default FourZeroFour;