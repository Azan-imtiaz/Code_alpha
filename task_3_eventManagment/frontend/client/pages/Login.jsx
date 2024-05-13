import React, { useContext, useEffect, useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from "../components/Spinner";
import {LoginFunc} from "../Services/services";
import { ToastContainer, toast } from 'react-toastify';
import {addData,addData2} from "../components/ContextProvider";

export default function Login() {
  const [spin, setSpin] = useState(false);
  const {key,setKey}=useContext(addData);
  const [inp,setInp]=useState({
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
function handleChange(e){
    const {name,value}=e.target;
    setInp(()=>{
        return {
            ...inp,[name]:value
        }
    });

}

async function handleSubmit(e){
    e.preventDefault();
    console.log(inp);
  try{

      const res= await LoginFunc(inp);
      if(res && res.data.st===200){
        document.cookie = "token=" + res.data.token;
        setKey(res.data.username);
        toast.success("Successfuly login-now you can create post");
      }
      if(res && res.data.st===600){
        toast.error("Wrong credientials");
      }
      if(res && res.data.st===300){
        toast.error("No account with this email");
      }
      if(res && res.data.st===700){
        toast.error("Internal server error");
      }

  }
catch(e){
    console.log(e);
toast.error("Some thing went wrong");
}



}
  return (
    <>
      {spin ? (
        <Stack gap={2} className="col-md-5 mx-auto">
          <Card style={cardStyle}>
            <Card.Body>
              <Card.Title style={{marginBottom:"20px"}}>Login</Card.Title>
              <Form>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email"  name="email" value={inp.email} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" name="password" value={inp.password} onChange={handleChange} />
                </Form.Group>
              </Form>
              <Button variant="primary" onClick={handleSubmit}>Login</Button>
            </Card.Body>
          </Card>
        </Stack>
      ) : (
        <Stack gap={2} className="col-md-5 mx-auto">
          <Spinner />
        </Stack>
      )}
   <ToastContainer />
    </>
  );
}
