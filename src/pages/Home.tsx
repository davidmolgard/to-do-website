import { useEffect } from "react";
import { useAppData } from "../AppDataContext";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import HighlightHeader, { colors, highlightTypes } from "../components/highlightHeader";

function Home() {
  // For now, sample/mock data. Replace with Context or props later.
  const { appointments, tasks, goals } = useAppData();

  const todayStr = new Date().toISOString().split("T")[0];

  useEffect(() => {
    // In a real app, you'd pull this from context or localStorage here
    // For now, fill with mock data (or keep empty arrays)
  }, []);

  const todayAppointments = appointments
    .filter((appt) => appt.date === todayStr)
    .sort((a, b) => a.time.localeCompare(b.time));

  const todayTasks = tasks.filter((task) => task.today && !task.completed);

  const currentGoals = goals.slice(0, 3); // Display top 3 goals

  return (
    <Container className="mt-4">
      <HighlightHeader text={"Homepage"} href={highlightTypes.squiggle} hue={colors.purple} />
      <h3 className="mb-4">Keep all your things in one place!</h3>

      <Row>
        {/* Left column: Appointments */}
        <Col md={8}>
          <Card className="mb-4 shadow-sm">
            <Card.Header className="fw-bold">Today’s Schedule</Card.Header>
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
                <div className="text-muted">No appointments for today</div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Right column: To-Do + Goals */}
        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Header className="fw-bold">To-Do List</Card.Header>
            <Card.Body>
              {todayTasks.length > 0 ? (
                <ListGroup>
                  {todayTasks.map((task) => (
                    <ListGroup.Item key={task.id}>{task.text}</ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <div className="text-muted">No tasks for today</div>
              )}
            </Card.Body>
          </Card>

          <Card className="shadow-sm">
            <Card.Header className="fw-bold">Goals</Card.Header>
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
                <div className="text-muted">No goals yet</div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
