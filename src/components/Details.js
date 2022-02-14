import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, ProgressBar, Row } from 'react-bootstrap';
import {  useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const Details = () => {


  const navigate = useNavigate();
  const  filteredList  = useSelector(state =>state.Reducer.productList)
  const location = useLocation();
  const itemList = location.state;
  const [newList] = filteredList?.filter(e => {
    return e.id === itemList.newId
  })
  const [listSubj] = newList.subjects?.filter(e => {
    return e.id === itemList.id
  });
  const [first, setfirst] = useState(listSubj?.isDone);
  const [target, setTarget] = useState();
  const [targetDone, setTargetDone] = useState();
  
  useEffect ( async ()  => {
    listSubj.isDone = first
    console.log((newList))
    await axios.put(`https://workingpro.herokuapp.com/dersler/${itemList.newId}`, newList)
  }, [first])


  const handleSubmitTarget = async (e) =>{
    e.preventDefault();
    listSubj.target =  parseInt(target);
    await axios.put(`https://workingpro.herokuapp.com/dersler/${itemList.newId}`, newList)
    setTarget("")

  }
  const handleSubmitTargetDone = async (e) =>{
    e.preventDefault();
    listSubj.targetDone =  parseInt(targetDone) + parseInt(listSubj.targetDone);
    const rate =  listSubj.targetDone / listSubj.target * 100 
    listSubj.targetRate = parseFloat(rate);
    await axios.put(`https://workingpro.herokuapp.com/dersler/${itemList.newId}`, newList)
    setTargetDone("")
  }  
  
  const newId = itemList.newId
  const handleReset = async (e) =>{
    e.preventDefault();
    listSubj.targetDone =  0;
    listSubj.targetRate = 0;
    listSubj.target = 0;
    listSubj.isDone = false;
    await axios.put(`https://workingpro.herokuapp.com/dersler/${itemList.newId}`, newList)
    navigate("/alan", {state : {newId}})
  }  



  return (
    <div>
      <Button onClick={() => navigate("/alan", {state : {newId}})}>GERİ</Button>
      <Alert variant= 'danger'>
    Konu Tamamlama
  </Alert>
    {itemList.selectedItem?.map(e => (


    <Form key = {e.id}>
    <Alert variant='warning' style={{textAlign:"center"}}>
    <Form.Check 
    type="switch"
    id="custom-switch"
    label= { `Konu tamamlama onayı : ` + e.subj}
    onChange = {(e) => setfirst(e.target.checked)}
    checked= {first}
    className ='checkbox'
  />


    </Alert>
  
</Form>
    ))}

    <Alert  variant= 'danger'>
    <Form  onSubmit={handleSubmitTarget} >
    <Form.Group  className='targetQua' >
    <Row className='targetQua' >
    <Form.Label className="mx-3" as={Col}>Hedef Soru Sayısı</Form.Label>
    <Form.Control as={Col} size='sm' onChange= {(e) => setTarget(e.target.value)} value={target}  type="text" placeholder="Soru Sayısı" />
    <Button size='sm' as={Col} className="mx-5" variant="primary" type="submit">
    Hedefe Gönder
  </Button>
  </Row>
  </Form.Group>
    </Form>
  </Alert>

    <Alert variant= 'success'>
    <Form onSubmit={handleSubmitTargetDone} >
  <Form.Group  >
  <Row className='targetQua' >
    <Form.Label  className="mx-3" as={Col}>Çözülen Soru Sayısını Giriniz</Form.Label>
    <Form.Control as={Col} size='sm'  onChange= {(e) => setTargetDone(e.target.value)} value={targetDone}  type="text" placeholder="Soru Sayısı" />
    <Button size='sm' as={Col} className="mx-5" variant="primary" type="submit">
    Hedefe Gönder
  </Button>
  </Row>
  </Form.Group>
 
</Form>
  </Alert>


    <Alert className='m-0' variant= 'danger'>
    Hedef : {listSubj.target !== 0 ? listSubj.target : "Hedef giriniz" } {" -  "}
    Çözülen Soru Sayısı : {listSubj.targetDone !== 0 ? listSubj.targetDone : "0"}
  <Button onClick={handleReset} size='sm' className='mx-4'>SIFIRLA</Button>
  </Alert>
  <ProgressBar className='progressBar' animated now={listSubj.targetRate} label={"% " + listSubj.targetRate} />
      </div>

  ) 
};

export default Details;
