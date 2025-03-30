import { Container } from "react-bootstrap";
import HighlightHeader, { highlightTypes, colors } from "./highlightHeader";

function Habits() {
  return (
	<Container>
		<HighlightHeader text={"Habit Tracker"} href={highlightTypes.block} hue={colors.orange}></HighlightHeader>
		<div>Sample text</div>
	</Container>
  );
}

export default Habits;