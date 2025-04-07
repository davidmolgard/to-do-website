// import { Button, Card, Container, Form } from "react-bootstrap";
// import { useState } from "react";

// function Login() {
//   const [isLoggingIn, setIsLoggingIn] = useState(true);
//   const [validated, setValidated] = useState(false);

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     const form = event.currentTarget;

//     if (form.checkValidity() === false) {
//       event.preventDefault();
//       event.stopPropagation();
//     }

//     setValidated(true);
//   };

//   return (
//     <Container>
//       {/* <HighlightHeader text={"Login"} href={highlightTypes.line} hue={colors.red}></HighlightHeader> */}
//       <Card>
//         <Card.Header className="d-flex align-items-center">
//           <Container className="h3">
//             {isLoggingIn ? "Login" : "Register"}
//           </Container>
//           <Container className="d-flex align-items-center justify-content-end">
//             <div className="me-2">
//               {isLoggingIn ? "Not signed up?" : "Already have an account?"}
//             </div>
//             <Button
//               variant="secondary"
//               onClick={() => setIsLoggingIn(!isLoggingIn)}
//             >
//               {isLoggingIn ? "Register" : "Login"}
//             </Button>
//           </Container>
//         </Card.Header>
//         <Card.Body>
//           <Form validated={validated} onSubmit={handleSubmit}>
//             {!isLoggingIn && (
//               <Form.Group className="mb-3">
//                 <Form.Label>First name</Form.Label>
//                 <Form.Control
//                   required
//                   type="text"
//                   placeholder="First name"
//                 />
//               </Form.Group>
//             )}

//             {!isLoggingIn && (
//               <Form.Group className="mb-3">
//                 <Form.Label>Last name</Form.Label>
//                 <Form.Control
//                   required
//                   type="text"
//                   placeholder="Last name"
//                 />
//               </Form.Group>
//             )}

//             <Form.Group className="mb-3">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 required
//                 type="email"
//                 placeholder="mail@example.com"
//               />
//               <Form.Control.Feedback type="invalid">
//                 Please enter a valid email.
//               </Form.Control.Feedback>
//             </Form.Group>

//             {!isLoggingIn && (
//               <Form.Group className="mb-3">
//                 <Form.Label>Confirm Email</Form.Label>
//                 <Form.Control
//                   required
//                   type="email"
//                   placeholder="mail@example.com"
//                 />
//               </Form.Group>
//             )}

//             <Form.Group className="mb-3">
//               <Form.Label htmlFor="inputPassword">Password</Form.Label>
//               <Form.Control
//                 required
//                 type="password"
//                 id="inputPassword"
//                 aria-describedby="passwordHelpBlock"
//                 placeholder="password"
//                 pattern="/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/"
//               />
//               {!isLoggingIn && (
//                 <Form.Text>
//                   Password must be at least 8 characters long and must contain one or more lowercase letter, uppercase letter, number, and special character.
//                 </Form.Text>
//               )}
//             </Form.Group>

//             <Button type="submit" variant="success" className="me-2 float-end">
//               {isLoggingIn ? "Login" : "Register"}
//               {/* <NavLink to="/">
//               </NavLink> */}
//             </Button>
//           </Form>
//         </Card.Body>
// 	</Card>
// </Container>
// );
// }

// export default Login;

import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import HighlightHeader, {
  colors,
  highlightTypes,
} from "../components/highlightHeader";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const passwordRegEx = new RegExp(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}/);

  const isValidPassword = () => {
    return passwordRegEx.test(password);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    let successful = false;

    if (form.checkValidity() === false || (isCreatingAccount && !isValidPassword())) {
      event.preventDefault();
      event.stopPropagation();
    }
    else {
      successful = true;
    }

    setValidated(true);

    if (successful) {
      navigate("/");
    }
  };

  return (
    <Container className="login mt-4" style={{ maxWidth: "500px" }}>
      <HighlightHeader
        text={isCreatingAccount ? "Create Account" : "Login"}
        href={highlightTypes.line}
        hue={colors.red}
      />
      <Card className="p-4 shadow-sm mt-3">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {isCreatingAccount ? (
            <>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" required />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formNewPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Create a password"
                  isValid={isValidPassword()}
                  isInvalid={!isValidPassword()}
                  required
                />
                <Form.Text>
                  Password must be at least 8 characters long and must contain
                  one or more lowercase letter, uppercase letter, and number.
                </Form.Text>
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Create Account
              </Button>
            </>
          ) : (
            <>
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" required />
              </Form.Group>
              
              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </>
          )}
        </Form>

        <div className="text-center mt-3">
          <small className="text-muted">
            {isCreatingAccount
              ? "Already have an account?"
              : "Don't have an account?"}
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
