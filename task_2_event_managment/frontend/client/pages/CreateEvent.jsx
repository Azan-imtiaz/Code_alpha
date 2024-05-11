import React, { useEffect, useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from "../components/Spinner";
import {VerifyTokenFunc,CreatePostFunc } from "../Services/services";
import { toast,ToastContainer } from "react-toastify";



export default function CreateEvent() {
  const [spin, setSpin] = useState(false);
  const [checkToken,setCheckToken]=useState();

  const [inp,setInp]=useState({title:"",description:"",date:"",createdBy:"",time:""});

  
  useEffect(() => {
    // Set a timeout to execute after 3000 milliseconds (3 seconds)
    const timer = setTimeout(() => {
      // Set the state to indicate that spinning/loading is happening
      setSpin(true);
  
      // Retrieve the token from the cookie named 'token'
      const token = getCookie('token');
     
      // Check if the token exists
      if (token) {
        // Token exists, call tokenVerification function with the token
        let input = { "token":  token };
        console.log(input);
        tokenVerification(input);
      } else {
        // Token doesn't exist, log a message and show a toast
        console.log('Token not found');
        toast("You need to login first");
      }
    }, 3000); // Timeout set to 3000 milliseconds (3 seconds)
  
    // Clean up function to clear the timeout when the component unmounts
    return () => clearTimeout(timer);
  }, []); // This effect runs only once after the component mounts (empty dependency array)
  
  
async function tokenVerification(input){
  try{
      
    const res=await VerifyTokenFunc(input);

   if(res && res.data.st===200){
     console.log(res.data);
    toast.success("Verified user");
    setCheckToken(true);
   }
   if(res && res.data.st===300){

    toast("Login first to create post ");
    setCheckToken(false);
  }
  if(res && res.data.st===500){

    toast.error("Login first to create post ");
    setCheckToken(false);
   
  }
    
  } catch(e){
  console.log(e);

  toast.error("internal server error ");
   
  }
   
} 
  const cardStyle = {
    backgroundColor: '#f0f8ff', // Light blue background color
    color: '#333', // Text color
    padding: '20px', // Padding around the content
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Subtle box shadow
    borderRadius: '10px', // Rounded corners
    paddingTop:"10px"
  };
  function handleChange(e) {
    setInp({ ...inp, [e.target.name]: e.target.value });
  }
  
  async function handkeSubmit(e){
    if(checkToken){
      if( ((inp.createdBy != "") && (inp.date!="") && (inp.description != "") && (inp.time != "") && (inp.time != "") )){
   
        try{
          e.preventDefault();
          console.log(inp);
        
      
        const res= await CreatePostFunc(inp);
          console.log(res);
        if(res && res.data.st===200){
          toast.success("Post created ");
        }
        if(res && res.data.st===300){
          toast.error("Some internal error")
        }
        
         }
         catch(e){
          toast.error("some error occur");
         }
               
      }
      else{
        toast("Fill all the fields");
  
      }
  
      }
      else{
        toast("You nead to Login first");
      }
       


    
  }






// Function to retrieve a cookie by name
function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}






  return (
    <>
      {spin ? (
        <Stack gap={2} className="col-md-5 mx-auto">
          <Card style={cardStyle}>
            <Card.Body>
              <Card.Title style={{marginBottom:"20px"}}>Create Event</Card.Title>
              <Form>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label >Title</Form.Label>
                  <Form.Control type="text" placeholder="Title" name="title" onChange={handleChange} value={inp.title}  />

                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label>One line Description</Form.Label>
                  <Form.Control type="text" placeholder="Description"name="description" onChange={handleChange} value={inp.description}  />
                </Form.Group>

              
                
                <Form.Group className="mb-3" controlId="formGroupPassword2">
                  <Form.Label>Time</Form.Label> 
                  <Form.Control type="date" placeholder="Date" name="date" onChange={handleChange} value={inp.date}  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupPassword3">
  <Form.Label>Time</Form.Label>
  <Form.Control type="time" placeholder="Time" name="time" onChange={handleChange} value={inp.time} />
</Form.Group>

<Form.Group className="mb-3" controlId="formGroupPassword4">
  <Form.Label>Host</Form.Label>
  <Form.Control type="text" placeholder="Host" name="createdBy" onChange={handleChange} value={inp.createdBy} />
</Form.Group>


              </Form>
              <Button variant="primary" onClick={handkeSubmit}>Submit</Button>
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
