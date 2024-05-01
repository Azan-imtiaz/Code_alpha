import React, { useEffect, useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import {fetchInterestFunc } from "../Services/services";
import { toast,ToastContainer } from "react-toastify";


export default function EventInfo() {
  const [spin, setSpin] = useState(false);
  const [arr,setArr]=useState([]);
  const { id } = useParams();

  


  useEffect(() => {
    const timer = setTimeout(() => {
      setSpin(true);
    }, 3000);
    getData();
    return () => clearTimeout(timer);
  }, []);
async function getData(){
  try{
   const  resp=await fetchInterestFunc({"id":id});
    if(resp && resp.data.status===200){
  
      setArr(resp.data.interestedPeople);
    }
   else{
    toast.error("Something went wrong");
   }
  }
  catch(e){
    toast.error("Something went wrong");
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




  return (
    <>
      {spin ? (
        <>
          {arr && arr.length > 0 ? (
            <Stack gap={2} className="col-md-5 mx-auto">
              <Card style={cardStyle}>
                <Card.Body>
                  <Card.Title style={{ marginBottom: "20px", fontSize: "23px" }}>People Who Shows Interest</Card.Title>
                  <ListGroup as="ol" numbered>
                    {arr.map((item, index) => (
                      <ListGroup.Item as="li" key={index} style={{ marginBottom: "3px" }}>{item}</ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Stack>
          ) : (
            <Stack gap={2} className="col-md-5 mx-auto">
              <Card style={cardStyle}>
                <Card.Body>
                  <Card.Title style={{ marginBottom: "20px", fontSize: "23px" }}>People Who Shows Interest</Card.Title>
                  <ListGroup>
                    <ListGroup.Item as="li" style={{ marginBottom: "3px" }}>No accounts show interest</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Stack>
          )}
        </>
      ) : (
        <Stack gap={2} className="col-md-5 mx-auto">
          <Spinner />
        </Stack>
      )}
      <ToastContainer />
    </>
  );

}
