import { useEffect } from "react";
import { useAppData } from "../AppDataContext";
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

function Home() {
  // For now, sample/mock data. Replace with Context or props later.
  const { appointments, tasks, goals } = useAppData();

  const todayStr = new Date().toISOString().split("T")[0];

  useEffect(() => {
    // In a real app, you'd pull this from context or localStorage here
    // For now, fill with mock data (or keep empty arrays)
  }, []);

  const navigate = useNavigate()

  const todayAppointments = appointments
    .filter((appt) => appt.date === todayStr)
    .sort((a, b) => a.time.localeCompare(b.time));

  const todayTasks = tasks.filter((task) => task.today && !task.completed);

  const currentGoals = goals.slice(0, 3); // Display top 3 goals

  return (
    <Container className="homepage mt-4">
      <Row>
        {/* Left column: Appointments */}
        <Col md={8}>
          <Card className="mb-4 shadow-sm">
			<NavLink to="/schedule" className="card-link">
            	<Card.Header className="fw-bold">Today’s Schedule</Card.Header>
			</NavLink>
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
					<Button size="sm" variant="outline-dark" onClick={() => navigate("/schedule")}>
						<i className="bi bi-calendar-plus me-2"></i>
						Schedule Appointment
					</Button>
				</div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Right column: To-Do + Goals */}
        <Col md={4}>
          <Card className="mb-4 shadow-sm">
		  	<NavLink to="/todo" className="card-link">
            	<Card.Header className="fw-bold">To-Do List</Card.Header>
			</NavLink>
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
					<Button size="sm" variant="outline-dark" onClick={() => navigate("/todo")}>
						<i className="bi bi-plus-square me-2"></i>
						Add Tasks
					</Button>
				</div>
              )}
            </Card.Body>
          </Card>

          <Card className="shadow-sm">
		  	<NavLink to="/goals" className="card-link">
            	<Card.Header className="fw-bold">Goals</Card.Header>
			</NavLink>
            <Card.Body>
              {currentGoals.length > 0 ? (
                currentGoals.map((goal) => {
                  const checked = goal.log[todayStr] ?? false;
                  return (
                    <div key={goal.id} className="mb-2 d-flex justify-content-between align-items-center">
                      <span>{goal.name}</span>
                      <span className={`badge bg-${checked ? "success" : "secondary"}`}>
                        {checked ? "✓ Tracked" : "Not Tracked"}
                      </span>
                    </div>
                  );
                })
              ) : (
				<div className="d-flex justify-content-between">
                	<div className="text-muted">No goals yet</div>
					<Button size="sm" variant="outline-dark" onClick={() => navigate("/goals")}>
						<i className="bi bi-plus-square me-2"></i>
						Add goals
					</Button>
				</div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
