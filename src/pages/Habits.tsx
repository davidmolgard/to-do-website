// import { Container } from "react-bootstrap";
// import HighlightHeader, { highlightTypes, colors } from "./highlightHeader";

// function Habits() {
//   return (
// 	<Container>
// 		<HighlightHeader text={"Habit Tracker"} href={highlightTypes.block} hue={colors.orange}></HighlightHeader>
// 		<div>Sample text</div>
// 	</Container>
//   );
// }

// export default Habits;

import { useState } from "react";
import { Container, Form, Button, ListGroup, Modal, ToggleButtonGroup, ToggleButton, Row, Col } from "react-bootstrap";
import HighlightHeader, { colors, highlightTypes } from "../components/highlightHeader";

interface Habit {
  id: number;
  name: string;
  log: { [date: string]: boolean };
  type: "good" | "bad";
}

function Habits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState("");
  const [newHabitType, setNewHabitType] = useState<"good" | "bad">("good");
  const [showAddModal, setShowAddModal] = useState(false);

  const todayStr = new Date().toISOString().split("T")[0];

  const addHabit = () => {
    if (!newHabit.trim()) return;
    setHabits([
      ...habits,
      { id: Date.now(), name: newHabit, log: { [todayStr]: false }, type: newHabitType },
    ]);
    setNewHabit("");
    setNewHabitType("good");
    setShowAddModal(false);
  };

  const toggleToday = (id: number) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              log: {
                ...habit.log,
                [todayStr]: !habit.log[todayStr],
              },
            }
          : habit
      )
    );
  };

  const renderHabitRow = (habit: Habit) => (
    <ListGroup.Item key={habit.id} className="d-flex justify-content-between align-items-center">
      <span>{habit.name}</span>
      <Button
        variant={habit.log[todayStr] ? (habit.type === "good" ? "success" : "danger") : "outline-secondary"}
        size="sm"
        onClick={() => toggleToday(habit.id)}
      >
        {habit.log[todayStr] ? "✓" : "Mark"}
      </Button>
    </ListGroup.Item>
  );

  const renderHabitStreak = (habit: Habit) => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      const str = date.toISOString().split("T")[0];
      return { date: str, checked: habit.log[str] || false };
    });

    return (
      <div key={habit.id} className="mt-3">
        <strong>{habit.name}</strong>
        <div className="d-flex gap-2 mt-1">
          {days.map((day) => (
            <div
              key={day.date}
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: day.checked
                  ? habit.type === "good"
                    ? "green"
                    : "red"
                  : "#ccc",
              }}
              title={day.date}
            ></div>
          ))}
        </div>
      </div>
    );
  };

  const goodHabits = habits.filter(h => h.type === "good");
  const badHabits = habits.filter(h => h.type === "bad");

  return (
    <Container className="mt-4" style={{ maxWidth: "800px" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <HighlightHeader text="Habit Tracker" href={highlightTypes.block} hue={colors.pink} />
        <Button onClick={() => setShowAddModal(true)}>Add Habit</Button>
      </div>

      <Row>
        <Col md={6}>
          <h5>Good Habits</h5>
          <ListGroup>{goodHabits.map(renderHabitRow)}</ListGroup>
        </Col>
        <Col md={6}>
          <h5>Bad Habits</h5>
          <ListGroup>{badHabits.map(renderHabitRow)}</ListGroup>
        </Col>
      </Row>

      {(habits.length > 0) && (
        <div className="mt-5">
          <h6>Streaks</h6>
          {[...goodHabits, ...badHabits].map(renderHabitStreak)}
        </div>
      )}

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Habit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="Habit name"
            className="mb-3"
          />
          <ToggleButtonGroup
            type="radio"
            name="habitType"
            value={newHabitType}
            onChange={(val: "good" | "bad") => setNewHabitType(val)}
          >
            <ToggleButton id="good-habit" value="good" variant="outline-success">
              Good
            </ToggleButton>
            <ToggleButton id="bad-habit" value="bad" variant="outline-danger">
              Bad
            </ToggleButton>
          </ToggleButtonGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={addHabit}>
            Add Habit
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Habits;