import { Container } from "react-bootstrap";
import HighlightHeader, { colors, highlightTypes } from "../components/highlightHeader";

function Schedule() {
  return (
	<Container>
		<HighlightHeader text={"Schedule"} href={highlightTypes.block} hue={colors.lightblue}></HighlightHeader>
		
	</Container>
  );
}

export default Schedule;