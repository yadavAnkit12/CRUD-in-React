import styled from "@emotion/styled";
import { useEffect, useState } from "react"
import { Table, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Style from "./modal.module.css"


const ShowEmployee = () => {
    const [emp, setEmp] = useState([])
    // const [newEmp,setnewEmp]=useState([])
    const [show, setShow] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [Phone, setPhone] = useState('')
    const [id, setId] = useState("")
    const [list, setList] = useState(true)



    useEffect(() => {

        setEmp(JSON.parse(localStorage.getItem('Empolyee')));
    }, [])

    const deleteEmp = (id) => {
        let arr = JSON.parse(localStorage.getItem('Empolyee'))
        arr = arr.filter(item => item.id !== id)
        localStorage.setItem("Empolyee", JSON.stringify(arr))
        window.location.reload()

    }
    useEffect(() => {

        setEmp(JSON.parse(localStorage.getItem('Empolyee')));
    }, [])

    const handleModal = (name, email, Phone, eid) => {
        setList(false)
        setShow(true)
        setName(name)
        setEmail(email)
        setPhone(Phone)
        setId(eid)

    }
    const closeMOdal = () => {
        setShow(false)
    }

    const updateEmployee = () => {
        console.log(name, id)
        let arrUp = JSON.parse(localStorage.getItem("Empolyee"))
        console.log(arrUp)
        console.log(id)
        let arrrr = arrUp.filter((item) => {

            if (item.id === id) {
                console.log(item.id)
                item.name = name
                item.email = email
                item.Phone = Phone
                localStorage.setItem("Empolyee", JSON.stringify(arrUp));
                setShow(false)
                window.location.reload()
            }
        })
        // console.log(arrrr)
        // console.log(arrUp)

    }
    return <>
        <h1 style={{ textAlign: "center", marginTop: "60px", color: 'white' }} > <u> Employee List</u></h1>
        <div className="container" >
            <Link to="/AddEmployee"><Button style={{ float: "right", margin: '30px' }}>Add Employee</Button></Link>

            <Table striped bordered hover >
                <thead style={{textAlign:'center'}}>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Delete / Update</th>
                    </tr>
                </thead>
                {
                    emp.map((elem) => {
                        return <>

                            <tbody style={{textAlign:'center'}}>
                                <tr>
                                    <td>{elem.name}</td>
                                    <td>{elem.email}</td>
                                    <td>{elem.Phone}</td>
                                    <td><Button variant="danger" onClick={() => deleteEmp(elem.id)}>Delete</Button> <Button variant="info" onClick={() => handleModal(elem.name, elem.email, elem.Phone, elem.id)}>Update</Button></td>
                                </tr>
                            </tbody>
                        </>
                    })

                }
            </Table>
            <Modal
                show={show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className={Style.med}
            >
                <div className={Style.inputbox}>
                <Modal.Header closeButton onClick={closeMOdal}  style={{paddingLeft:'35%',paddingTop:'35px',paddingBottom:'35px'}}>
                    <Modal.Title id="contained-modal-title-vcenter" style={{fontWeight:'bolder'}}>
                        Employee Updation
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className={Style.input}>
                        <Form.Group className="mb-3" controlId="formBasicEmail" onChange={e => setName(e.target.value)}   >
                            <Form.Label style={{fontWeight:'bold'}}>Employee Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" value={name} autoComplete="off"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail" onChange={e => setEmail(e.target.value)} >
                            <Form.Label style={{fontWeight:'bold'}}>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email}  autoComplete="off"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPhone" onChange={e => setPhone(e.target.value)} >
                            <Form.Label style={{fontWeight:'bold'}}>Employee Phno.</Form.Label>
                            <Form.Control type="text" placeholder="Phone no." value={Phone}  autoComplete="off"s/>
                        </Form.Group>


                        <Button variant="primary" style={{ width: '100%' ,marginTop:'20px'}} onClick={() => updateEmployee()}>
                            Save Changes
                        </Button>
                    </Form>
                </Modal.Body>
                </div>

            </Modal>

        </div>
    </>

}

export default ShowEmployee