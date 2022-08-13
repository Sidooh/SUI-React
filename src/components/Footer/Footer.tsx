import React from 'react';
import { Col, Row } from 'react-bootstrap';

export interface FooterProps {
    serviceName: 'Payments' | 'Products' | 'Savings' | 'Notify',
    version: string | number
}

const Footer = ({version, serviceName}: FooterProps) => {
    return (
        <footer className="footer">
            <Row className="justify-content-between text-center fs--1 mt-4 mb-3">
                <Col sm="auto">
                    <p className="mb-0 text-600">
                        {serviceName} | <a href="/">Sidooh</a>{' '}
                        <br className="d-sm-none"/> &copy; {new Date().getFullYear()}
                    </p>
                </Col>
                <Col sm="auto"><p className="mb-0 text-600">v{version}</p></Col>
            </Row>
        </footer>
    );
};

export default Footer;
