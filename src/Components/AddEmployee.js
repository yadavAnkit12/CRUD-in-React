import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import  validator from "validator"

const validationSchema = Yup.object().shape({
  name: Yup.string().matches(/^[A-Za-z]+$/, "Name should only contain alphabets").max(25).required("Employee Name is required"),
  email: Yup.string().email('Invalid email address').matches(/^([A-Za-z0-9_\-\.])+\@(?!(?:[A-Za-z0-9_\-\.]+\.)?([A-Za-z]{2,4})\.\2)([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/ ,'Invalid email').required('Email is required'),
  Phone: Yup.string()
  .matches(/^[0-9]{10}$/, 'Must be exactly 10 digits and only Numbers are Allowed')
  .required('Required'),
});

const AddEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [emp, setEmp] = useState([]);

  useEffect(() => {
    setEmp(JSON.parse(localStorage.getItem("Empolyee")));
  }, []);

  const addEmp = (e) => {
    e.preventDefault();

    // Validate the form using Yup schema
    validationSchema
      .validate({ name, email, Phone })
      .then(() => {
        let newArr = [...emp];
        let item = {
          name,
          email,
          Phone,
          id: Math.random(),
        };
        newArr.push(item);
        setEmp(newArr);

        setName("");
        setEmail("");
        setPhone("");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  useEffect(() => {
    localStorage.setItem("Empolyee", JSON.stringify(emp));
  }, [emp]);

  return (
    <>
      <Container style={{ margin: "60px auto" }}>
        <Card
          style={{
            padding: "50px",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
          }}
        >
          <Card.Text>
            <h1 style={{ textAlign: "center", margin: "10px", fontWeight: "bolder" }}>
              Employee Data
            </h1>
          </Card.Text>
          <Card.Body>
            <Form style={{ maxWidth: "60%", margin: "0 auto" }}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label style={{ fontWeight: "bold", fontSize: "20px" }}>Employee Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="off"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label style={{ fontWeight: "bold", fontSize: "20px" }}>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label style={{ fontWeight: "bold", fontSize: "20px" }}>Employee Phno.</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Phone no."
                  value={Phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="off"
                />
              </Form.Group>

              <Row>
                <Col sm="6">
                  <Button variant="primary" onClick={addEmp} style={{ width: "100%" }}>
                    Submit
                  </Button>
                </Col>
                <Col sm="6">
                  <Link to="/">
                    <Button variant="info" style={{ width: "100%" }}>
                      Show Employee
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default AddEmployee;
