import React from 'react';
import './LowerFooter.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row } from 'reactstrap';
import { FaPhoneAlt } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { FaSquareXTwitter } from "react-icons/fa6";

export function LowerFooter() {
    return (
        <div className='footer'>
            <div className='footer-content'>
                <Row>
                    <Col sm='4'>

                        <ul>
                            <li className='m-4 text-white'> Contact us on</li>
                            <li className='m-4 text-white'>
                                <FaPhoneAlt className='me-3' />
                                +923239223062
                            </li>
                            <li className='m-4 text-white'>
                                <BsWhatsapp className='me-3' />
                                +923239221992
                            </li>
                            <li className='m-4 text-white'>
                                <FaPhoneAlt className='me-3' />
                                456552
                            </li>
                        </ul>
                    </Col>
                    <Col sm='4'>

                        <ul>
                            <li className='m-4 text-white'> About us</li>
                            <li className='m-4 text-white'>
                                Room Allocation and Booking
                            </li>
                            <li className='m-4 text-white'>
                                Fee Management
                            </li>
                            <li className='m-4 text-white'>
                                Maintenance and Complaint Management
                            </li>
                        </ul>
                    </Col>
                    <Col sm='4'>

                        <ul>
                            <li className='m-4 text-white'> Follow us on</li>
                            <li className='m-4 text-white'>
                                <FaFacebook className='me-3' />
                                Facebook
                            </li>
                            <li className='m-4 text-white'>
                                <FiInstagram className='me-3' />
                                Instagram
                            </li>
                            <li className='m-4 text-white'>
                                <FaSquareXTwitter className='me-3' />
                                Twitter
                            </li>
                        </ul>
                    </Col>
                </Row>

            </div>
        </div>
    )
}

