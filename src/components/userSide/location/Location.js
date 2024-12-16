import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Location.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Col, Row } from 'reactstrap';
import { TiLocationOutline } from "react-icons/ti";

export function Location() {
    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])
    return (
        <section className="location  bg-light" id="location">
            <h1 className="text-center ">  Location </h1>
            <hr className="w-25 m-auto mb-2 " />
            <div className='location-content'>
                <Row className='h-100'>
                    <Col sm="6" >
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3324.989572793313!2d73.09169027541054!3d33.553647243893415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfed29fa993167%3A0x3dc2be9fbe4eb0fa!2sBoys%20Hostel!5e0!3m2!1sen!2s!4v1731556879501!5m2!1sen!2s" width="100%" height="100%" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" data-aos="fade-right"></iframe>
                    </Col>
                    <Col sm="6">
                        <div className='location-text' data-aos="fade-left">
                            <h5>Location</h5>
                            <span> <TiLocationOutline /> Satellite Town, Rawalpindi </span>
                        </div>
                    </Col>
                </Row>
            </div>

        </section>
    )
}