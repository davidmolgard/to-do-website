import { Container } from "react-bootstrap";
import HighlightHeader, { colors, highlightTypes } from "./highlightHeader";

function Schedule() {
  return (
	<Container>
		<HighlightHeader text={"Schedule"} href={highlightTypes.block} hue={colors.pink}></HighlightHeader>
		<div>Sample text</div>
	</Container>
  );
}

export default Schedule;