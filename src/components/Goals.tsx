import { Container } from "react-bootstrap";
import HighlightHeader, { colors, highlightTypes } from "./highlightHeader";

function Goals() {
  return (
	<Container>
		<HighlightHeader text={"Goals"} href={highlightTypes.line} hue={colors.blue}></HighlightHeader>
		<div>Sample text</div>
	</Container>
  );
}

export default Goals;