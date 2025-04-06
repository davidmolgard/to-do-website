import { Button, Card, Container, Form } from "react-bootstrap";
import { useState } from "react";

function Login() {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Container>
      {/* <HighlightHeader text={"Login"} href={highlightTypes.line} hue={colors.red}></HighlightHeader> */}
      <Card>
        <Card.Header className="d-flex align-items-center">
          <Container className="h3">
            {isLoggingIn ? "Login" : "Register"}
          </Container>
          <Container className="d-flex align-items-center justify-content-end">
            <div className="me-2">
              {isLoggingIn ? "Not signed up?" : "Already have an account?"}
            </div>
            <Button
              variant="secondary"
              onClick={() => setIsLoggingIn(!isLoggingIn)}
            >
              {isLoggingIn ? "Register" : "Login"}
            </Button>
          </Container>
        </Card.Header>
        <Card.Body>
          <Form validated={validated} onSubmit={handleSubmit}>
            {!isLoggingIn && (
              <Form.Group className="mb-3">
                <Form.Label>First name</Form.Label>
                <Form.Control 
                  required 
                  type="text" 
                  placeholder="First name"
                />
              </Form.Group>
            )}

            {!isLoggingIn && (
              <Form.Group className="mb-3">
                <Form.Label>Last name</Form.Label>
                <Form.Control 
                  required 
                  type="text" 
                  placeholder="Last name"
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                required 
                type="email"
                placeholder="mail@example.com" 
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email.
              </Form.Control.Feedback>
            </Form.Group>

            {!isLoggingIn && (
              <Form.Group className="mb-3">
                <Form.Label>Confirm Email</Form.Label>
                <Form.Control 
                  required 
                  type="email"
                  placeholder="mail@example.com"
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label htmlFor="inputPassword">Password</Form.Label>
              <Form.Control
                required
                type="password"
                id="inputPassword"
                aria-describedby="passwordHelpBlock"
                placeholder="password"
                pattern="/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/"
              />
              {!isLoggingIn && (
                <Form.Text>
                  Password must be at least 8 characters long and must contain one or more lowercase letter, uppercase letter, number, and special character.
                </Form.Text>
              )}
            </Form.Group>

            <Button type="submit" variant="success" className="me-2 float-end">
              {isLoggingIn ? "Login" : "Register"}
              {/* <NavLink to="/">
              </NavLink> */}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
