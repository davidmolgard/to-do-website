import { useEffect } from "react";
// import { useAppData } from "../AppDataContext";
import { useDemoAppData } from "../DemoDataContext";
import { Container, Card, ListGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { WidthProvider, Responsive } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

function Home() {
  // For now, sample/mock data. Replace with Context or props later.
  const { appointments, tasks, goals } = useDemoAppData();

  const todayStr = new Date().toISOString().split("T")[0];

  useEffect(() => {
    // In a real app, you'd pull this from context or localStorage here
    // For now, fill with mock data (or keep empty arrays)
  }, []);

  const navigate = useNavigate();

  const todayAppointments = appointments
    .filter((appt) => appt.date === todayStr)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const todayTasks = tasks.filter((task) => task.today && !task.completed);

  const currentGoals = goals.slice(0, 3); // Display top 3 goals
	
	const scheduleKey = "schedule";
	const todoKey = "todo";
	const goalsKey = "goals";

  const layouts = {
    xl: [
			{ i: scheduleKey, x: 0, y: 0, w: 8, h: 12, minH: 4 },
			{ i: goalsKey, x: 8, y: 0, w: 4, h: 5, minH: 2 },
			{ i: todoKey, x: 8, y: 3, w: 4, h: 7, minH: 2 },
		],
		lg: [
			{ i: scheduleKey, x: 0, y: 0, w: 6, h: 8, minH: 4 },
			{ i: goalsKey, x: 6, y: 0, w: 4, h: 4, minH: 2 },
			{ i: todoKey, x: 6, y: 3, w: 4, h: 4, minH: 2 },
		],
    md: [
			{ i: scheduleKey, x: 0, y: 0, w: 3, h: 8, minH: 4 },
			{ i: goalsKey, x: 3, y: 0, w: 3, h: 4, minH: 2 },
			{ i: todoKey, x: 3, y: 3, w: 3, h: 4, minH: 2 },
		],
		sm: [
			{ i: scheduleKey, x: 0, y: 0, w: 4, h: 5, minH: 4 },
			{ i: goalsKey, x: 0, y: 0, w: 2, h: 5, minH: 2 },
			{ i: todoKey, x: 2, y: 3, w: 2, h: 5, minH: 2 },
		],
    xs: [
			{ i: scheduleKey, x: 0, y: 0, w: 4, h: 5, minH: 4 },
			{ i: goalsKey, x: 0, y: 5, w: 2, h: 5, minH: 2 },
			{ i: todoKey, x: 0, y: 10, w: 2, h: 5, minH: 2 },
		]
  };

  return (
    <Container className="homepage">
      <ResponsiveReactGridLayout 
				className="layout"
				layouts={layouts} 
				breakpoints={{ xl: 1200, lg: 992, md: 768, sm: 576, xs: 0 }}
				cols={{ xl: 12, lg: 10, md: 6, sm: 4, xs: 2 }}
				margin={[20, 20]}
				rowHeight={40}
				draggableHandle=".drag-handle"
				useCSSTransforms={false}
			>
        <Card key={scheduleKey} className="schedule shadow-sm">
					<Card.Header className="fw-bold drag-handle">Today’s Schedule</Card.Header>
          <Card.Body>
            {todayAppointments.length > 0 ? (
              <ListGroup>
                {todayAppointments.map((appt) => (
                  <ListGroup.Item key={appt.id}>
                    <strong>{appt.time}</strong> — {appt.title}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <div className="d-flex justify-content-between">
                <div className="text-muted mb-2">No appointments for today</div>
                <Button
                  size="sm"
                  variant="outline-dark"
                  onClick={() => navigate("/schedule")}
                >
                  <i className="bi bi-calendar-plus me-2"></i>
                  Schedule Appointment
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>

        <Card key={goalsKey} className="goals shadow-sm">
					<Card.Header className="fw-bold drag-handle">Goals</Card.Header>
          <Card.Body>
            {currentGoals.length > 0 ? (
              currentGoals.map((goal) => {
                const checked = goal.log[todayStr] ?? false;
                return (
                  <div
                    key={goal.id}
                    className="mb-2 d-flex justify-content-between align-items-center"
                  >
                    <span>{goal.name}</span>
                    <span
                      className={`badge bg-${
                        checked ? "success" : "secondary"
                      }`}
                    >
                      {checked ? "✓ Tracked" : "Not Tracked"}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="d-flex justify-content-between">
                <div className="text-muted">No goals yet</div>
                <Button
                  size="sm"
                  variant="outline-dark"
                  onClick={() => navigate("/goals")}
                >
                  <i className="bi bi-plus-square me-2"></i>
                  Add goals
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>

        <Card key={todoKey} className="todo shadow-sm">
					<Card.Header className="fw-bold drag-handle">To-Do List</Card.Header>
          <Card.Body>
            {todayTasks.length > 0 ? (
              <ListGroup>
                {todayTasks.map((task) => (
                  <ListGroup.Item key={task.id}>{task.text}</ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <div className="d-flex justify-content-between">
                <div className="text-muted mb-2">No tasks for today</div>
                <Button
                  size="sm"
                  variant="outline-dark"
                  onClick={() => navigate("/todo")}
                >
                  <i className="bi bi-plus-square me-2"></i>
                  Add Tasks
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>

      </ResponsiveReactGridLayout>
    </Container>
  );
}

export default Home;
