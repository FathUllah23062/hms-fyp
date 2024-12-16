import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Spinner } from 'reactstrap'
import { SingInToAdmin } from '../../../store/actions/authAction';
import { toast } from 'react-toastify';
import { UserSideBar } from '../userSideBar/UserSideBar';
import { NavigationBar } from '../navbar/NavigationBar';
import { Home } from '../home/Home';

export function SignIn() {
    const [signInModal, setSignInModal] = useState(true);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loader, error } = useSelector((state) => state.auth)
    const signInModalFun = () => {
        setSignInModal(!signInModal);
        navigate('/');
    }


    // this is the code to sign in to admin

    const submitonSignIn = (e) => {
        console.log("btn click")
        e.preventDefault();
        dispatch(SingInToAdmin(email, password, () => {
            navigate('/admin')
            toast.success("Sign In successfylly!", {
                position: "top-center"
            })
            setEmail("")
            setPassword("")
        }))
    }
    return (
        <div>
            <NavigationBar />
            <UserSideBar />
            <Home />

            {/*  Modal to singin adim side */}

            <div>
                <Modal isOpen={signInModal} toggle={signInModalFun}>
                    <ModalHeader toggle={signInModalFun} className='text-center'>Sign In</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={submitonSignIn}>
                            <FormGroup floating data-aos="fade-left" className='shadow'>
                                <Input
                                    id="exampleEmail"
                                    name="email"
                                    placeholder="Email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Label for="exampleEmail">
                                    Email
                                </Label>
                            </FormGroup>
                            <FormGroup floating data-aos="fade-right" className='shadow'>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder='password'
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Label for="password">
                                    Password
                                </Label>
                            </FormGroup>
                            <Button outline block type='submit' className='mb-3 shadow'>
                                {loader ? <Spinner size="lg" color="light" /> : 'Sign In'}
                            </Button>
                            <Button outline block onClick={signInModalFun} className='mb-3 shadow'>
                                Cancel
                            </Button>
                        </Form>
                        <div className='text-danger'>{error}</div>
                    </ModalBody>
                </Modal>
            </div>
        </div>
    )
}


