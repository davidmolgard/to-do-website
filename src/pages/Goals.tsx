import { useAppData } from "../AppDataContext";
import { useState } from "react";
import {
  Container,
  Form,
  Button,
  ListGroup,
  Modal,
	Card
} from "react-bootstrap";

interface Goal {
  id: number;
  name: string;
  log: { [date: string]: boolean };
}

function Goals() {
	const { goals, setGoals } = useAppData();
  const [newGoal, setNewGoal] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const todayStr = new Date().toISOString().split("T")[0];

  const addGoal = () => {
    if (!newGoal.trim()) return;
    setGoals([
      ...goals,
      { id: Date.now(), name: newGoal, log: { [todayStr]: false } },
    ]);
    setNewGoal("");
    setShowAddModal(false);
  };

  const toggleToday = (id: number) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              log: {
                ...goal.log,
                [todayStr]: !goal.log[todayStr],
              },
            }
          : goal
      )
    );
  };

  const renderGoalRow = (goal: Goal) => (
    <ListGroup.Item key={goal.id} className="d-flex justify-content-between align-items-center">
      <span>{goal.name}</span>
      <Button
        variant={goal.log[todayStr] ? "success" : "outline-secondary"}
        size="sm"
        onClick={() => toggleToday(goal.id)}
      >
        {goal.log[todayStr] ? "✓" : "Mark"}
      </Button>
    </ListGroup.Item>
  );

  const renderGoalStreak = (goal: Goal) => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      const str = date.toISOString().split("T")[0];
      return { date: str, checked: goal.log[str] || false };
    });

    return (
      <div key={goal.id} className="mt-3">
        <strong>{goal.name}</strong>
        <div className="d-flex gap-2 mt-1">
          {days.map((day) => (
            <div
              key={day.date}
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: day.checked ? "green" : "#ccc",
              }}
              title={day.date}
            ></div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Container className="goal mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
				<h1>Goals</h1>
        <Button onClick={() => setShowAddModal(true)}>Add Goal</Button>
      </div>

      <Container className="m-0 p-0 d-flex justify-content-between">
        <Card className="goals list">
          <Card.Header>Today's Goals</Card.Header>
          <ListGroup variant="flush">
						{goals.map(renderGoalRow)}
					</ListGroup>
        </Card>
        <Card className="goals streaks">
          <Card.Header>Streaks🔥</Card.Header>
					<Card.Body>
          	{goals.map(renderGoalStreak)}
					</Card.Body>
        </Card>
      </Container>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Goal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Goal name"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={addGoal}>
            Add Goal
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Goals;
