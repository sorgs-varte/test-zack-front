import React from 'react';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {

    let navigate = useNavigate();

    return (
        <Stack gap={2} className="col-md-5 mx-auto mt-5">
            <Button variant="primary" onClick={ ()=> {navigate("/alerteur")}}>ALERTEUR</Button>
            <Button variant="secondary" onClick={ ()=> {navigate("/admin")}}>ADMINISTRATEUR</Button>
        </Stack>
    )
}