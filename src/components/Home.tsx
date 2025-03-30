import { Container } from "react-bootstrap";
import HighlightHeader, { colors, highlightTypes } from "./highlightHeader";

function Home() {
  return (
	<Container>
		<HighlightHeader text={"Homepage"} href={highlightTypes.squiggle} hue={colors.purple}></HighlightHeader>
		<h3>Keep all your things in one place!</h3>
	</Container>
  );
}

export default Home;