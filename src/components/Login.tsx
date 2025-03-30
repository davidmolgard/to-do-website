import { Container } from "react-bootstrap";
import HighlightHeader, { colors, highlightTypes } from "./highlightHeader";

function Login() {
  return (
	<Container>
		<HighlightHeader text={"Login"} href={highlightTypes.line} hue={colors.red}></HighlightHeader>
		<div>Sample text</div>
	</Container>
  );
}

export default Login;