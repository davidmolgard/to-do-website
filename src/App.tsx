import Home from "./components/Home";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Schedule from "./components/Schedule";
import Login from "./components/Login";
import Goals from "./components/Goals";
import Habits from "./components/Habits";
import Todo from "./components/Todo";

function App() {
  return (
	<Router>
		<Navigation></Navigation>
		<Routes>
			<Route path="/" element={<Home/>} />
			<Route path="/schedule" element={<Schedule/>} />
			<Route path="/goals" element={<Goals/>} />
			<Route path="/habits" element={<Habits/>} />
			<Route path="/todo" element={<Todo/>} />
			<Route path="/login" element={<Login/>} />
		</Routes>
	</Router>
  );
}

export default App;
