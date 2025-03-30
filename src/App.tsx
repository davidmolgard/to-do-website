import Home from "./components/Home";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
	<Router>
		<Navigation></Navigation>
		<Routes>
			<Route path="/" element={<Home/>} />
		</Routes>
	</Router>
  );
}

export default App;
