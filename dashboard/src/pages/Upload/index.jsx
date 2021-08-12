import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from './upload.module.css';
import UploadBox from '../../components/UploadBox';

// Analytics
import ReactGA from 'react-ga';
import analytics from '../../analytics';

import Dropzone from 'react-dropzone'

const Upload = () => {
    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
      }, [])
    const [show, setShow] = useState(true);

    const handleClose = () => window.location = "/";
    const handleSubmit = () => {
        setShow(false);
        console.log("submit");
    }

    return (
    <>
        <div className={styles.bgNav}>
            <img src="/images/home.png" width="100%"/>
        </div>
        <div className={styles.container}>
            <h3>Upload a Buoy</h3>
            <Form>
                <Form.Label>Buoy Name:</Form.Label>
                <p className={styles.description}>Names are used to identify the buoy and will be visible on the map</p>
                <Form.Control className={styles.nameInput} type="text" placeholder="" />
                <Form.Label>Buoy Trace:</Form.Label>
                <p className={styles.description}>GPS Data is required to place the buoy on the map</p>
                <UploadBox title="Buoy Track" description="GPS coordinates over time"/>
                <Form.Label>Buoy Data:</Form.Label>
                <p className={styles.description}>Either third octave level (TOL) or broadband (BB) is required</p>
                {/* replace console.log with whatever we want to do with files */}
                <div className={styles.dataUpload}>
                    <UploadBox title="TOL" description="Third octave level"/>
                    <UploadBox title="BB" description="Broadband"/>
                </div>
            </Form>
        </div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Log in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Only users with administrative access may add data directly onto the map. To request data to be added, email aparande17@berkeley.edu. Otherwise, please log in:
            <Form>
                <Form.Group className="mb-3" controlId="user">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="pass">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="" />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
            Submit
            </Button>
        </Modal.Footer>
        </Modal>
    </>
    );
}
export default Upload;