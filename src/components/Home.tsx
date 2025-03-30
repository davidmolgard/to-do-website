import { Container } from "react-bootstrap";
import HighlightHeader from "./highlightHeader";

function Home() {
  return (
	<Container>
		<HighlightHeader text={"Homepage"} href={undefined}></HighlightHeader>
		<h3>Keep all your things in one place!</h3>
	</Container>
  );
}

export default Home;