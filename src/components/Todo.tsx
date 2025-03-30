import { Container } from "react-bootstrap";
import HighlightHeader, { colors, highlightTypes } from "./highlightHeader";

function Todo() {
  return (
	<Container>
		<HighlightHeader text={"To-Do List"} href={highlightTypes.block} hue={colors.yellow}></HighlightHeader>
		<div>Sample text</div>
	</Container>
  );
}

export default Todo;