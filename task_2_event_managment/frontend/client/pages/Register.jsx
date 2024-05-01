import React, { useEffect, useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from "../components/Spinner";
import { ToastContainer, toast } from 'react-toastify';
import { RegistrationFunc } from "../Services/services";
export default function Register() {
  const [spin, setSpin] = useState(false);
   
  const [inp,setInp]=useState({
    username:"",
    email:"",
    password:""
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setSpin(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const cardStyle = {
    backgroundColor: '#f0f8ff', // Light blue background color
    color: '#333', // Text color
    padding: '20px', // Padding around the content
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Subtle box shadow
    borderRadius: '10px', // Rounded corners
    paddingTop:"10px"
  };
  function handleChange(e) {
    
    const { name, value } = e.target; // Correct property access
    setInp({
        ...inp, [name]: value
    });
    console.log(inp)
}

async function handleSubmit(e) {
    e.preventDefault(); // Prevent form from reloading the page
    if(inp.email=="" || inp.password=="" || inp.username=="" ){
    toast.error("Please Fill all fields")
   return;    
}
try {
    const res = await RegistrationFunc(inp);
    if (res && res.data.st === 201) {
        toast.success("Successfully registered");
    } 
    if(res && res.data.st===409 ){
        toast.error("Email Already Exist");
    }
    if(res && res.data.st===500){
        toast.error("Failed to create user");
    }
    if(res && res.data.st === 501){
        toast.error("Internal server error");
    }
} catch (error) {
    console.error('Error:', error.message);
    toast.error("Something went wrong, please try again later");
}
  
}

  return (
    <>
      {spin ? (
        <Stack gap={2} className="col-md-5 mx-auto">
          <Card style={cardStyle}>
            <Card.Body>
              <Card.Title style={{marginBottom:"20px"}}>  Register</Card.Title>
              <Form>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="email" placeholder="Enter username" name="username" value={inp.username} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" name="email"  value={inp.email} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" name="password" value={inp.password} onChange={handleChange}/>
                </Form.Group>
              </Form>
              <Button variant="primary" onClick={handleSubmit}>Submit</Button>
            </Card.Body>
          </Card>
        </Stack>
      ) : (
        <Stack gap={2} className="col-md-5 mx-auto">
          <Spinner />
        </Stack>
      )}
      <ToastContainer/>
    </>
  );
}
