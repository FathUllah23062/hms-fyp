import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Contact.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { addContact } from '../../../store/actions/addContactAction';
import { toast } from 'react-toastify';

export function Contact() {
    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, []);
    //this code is for to add contact in firebase
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const submitContact = (e) => {
        e.preventDefault();
        dispatch(addContact(email, userName, message));
        setEmail('');
        setUserName('');
        setMessage('');
        toast.success("  Done ", {
            position: "top-center"
        });
    }
    return (
        <section className="contact  bg-light" id="contact">
            <h1 className="text-center ">  Contact us</h1>
            <hr className="w-25 m-auto mb-2 " />
            <div className="col-lg-4 col-md-4 col-sm-4 col-10 d-block m-auto"></div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-10 d-block m-auto">
                <h4 className='text-center mb-5' data-aos="fade-right">If you are facing any problem or if you have any quere let us know</h4>
                <Form onSubmit={submitContact}>
                    <FormGroup floating data-aos="fade-left" className='shadow'>
                        <Input
                            id="exampleEmail"
                            name="email"
                            placeholder="Email"
                            type="email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Label for="exampleEmail">
                            Your email
                        </Label>
                    </FormGroup>
                    <FormGroup floating data-aos="fade-right" className='shadow'>
                        <Input
                            id="name"
                            name="name"
                            placeholder=" Your Name"
                            type="text"
                            required
                            value={userName}
                            onChange={e => setUserName(e.target.value)}
                        />
                        <Label for="name">
                            Your Name
                        </Label>
                    </FormGroup>
                    <FormGroup floating data-aos="fade-right" className='shadow'>
                        <Input
                            id="message"
                            name="message"
                            placeholder="meassage"
                            type="textarea"
                            required
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                        />
                        <Label for="message">
                            Your message
                        </Label>
                    </FormGroup>
                    <Button outline block data-aos="fade-left" className='shadow'>
                        Send message
                    </Button>
                </Form>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-4 col-10 d-block m-auto"></div>
        </section>
    )
}