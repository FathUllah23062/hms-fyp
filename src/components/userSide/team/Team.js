import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Team.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import cookImage from "../../../assets/cook.webp";
import wardenImage from "../../../assets/warden.avif";
import ownerImage from "../../../assets/owner.avif";

export function Team() {
    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])
    return (
        <section className="team py-4  bg-light" id="team">
            <h1 className="text-center mt-5">  Our Team</h1>
            <hr className="w-25 m-auto" />
            <div className='team-content'>
                <Card
                    style={{
                        width: '18rem'
                    }}
                    data-aos="fade-right"
                    className='shadow'
                >
                    <img
                        alt="Sample"
                        src={cookImage}
                    />
                    <CardBody>
                        <CardTitle tag="h5">
                            Gull
                        </CardTitle>
                        <CardSubtitle
                            className="mb-2 text-muted"
                            tag="h6"
                        >
                            Cook
                        </CardSubtitle>
                        <CardText>
                            Gull is our cook, he make very delicacy meal for us.
                        </CardText>
                    </CardBody>
                </Card>
                <Card
                    style={{
                        width: '18rem'
                    }}
                    data-aos="zoom-in-down"
                    className='shadow'
                >
                    <img
                        alt="Sample"
                        src={wardenImage}
                    />
                    <CardBody>
                        <CardTitle tag="h5">
                            Ilham
                        </CardTitle>
                        <CardSubtitle
                            className="mb-2 text-muted"
                            tag="h6"
                        >
                            Warden
                        </CardSubtitle>
                        <CardText>
                            Ilham is our warden, who take care of every one.
                        </CardText>
                    </CardBody>
                </Card>
                <Card
                    style={{
                        width: '18rem'
                    }}
                    data-aos="fade-left"
                    className='shadow'
                >
                    <img
                        alt="Sample"
                        src={ownerImage}
                    />
                    <CardBody>
                        <CardTitle tag="h5">
                            Ali
                        </CardTitle>
                        <CardSubtitle
                            className="mb-2 text-muted"
                            tag="h6"
                        >
                            Owner
                        </CardSubtitle>
                        <CardText>
                            Ali is the owner of this hostel , he is so loyal and honest.
                        </CardText>
                    </CardBody>
                </Card>
            </div>
        </section>
    )
}


