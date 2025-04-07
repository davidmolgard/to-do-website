import { useState } from "react";
import { Container, Form, Button, Card, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import HighlightHeader, { colors, highlightTypes } from "../components/highlightHeader";

function Login() {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  return (
    <Container className="mt-4" style={{ maxWidth: "500px" }}>
      <HighlightHeader text={"Login"} href={highlightTypes.line} hue={colors.red} />
      <Card className="p-4 shadow-sm mt-3">
        <Form>
          {isCreatingAccount ? (
            <>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formNewPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Create a password" />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Create Account
              </Button>
            </>
          ) : (
            <>
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Log In
              </Button>
            </>
          )}
        </Form>

        <div className="text-center mt-3">
          <small className="text-muted">
            {isCreatingAccount ? "Already have an account?" : "Don't have an account?"}
          </small>
          <Button
            variant="link"
            size="sm"
            onClick={() => setIsCreatingAccount(!isCreatingAccount)}
          >
            {isCreatingAccount ? "Log In" : "Create Account"}
          </Button>
        </div>
      </Card>
    </Container>
  );
}

export default Login;
