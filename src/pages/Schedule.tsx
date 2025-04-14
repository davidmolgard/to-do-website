import { useState } from "react";
import { Container, Button, Modal, Form, Dropdown } from "react-bootstrap";
import { useAppData } from "../AppDataContext";
import WeekView from "../components/WeekView";
import MonthView from "../components/MonthView";
import "../styles/schedule.scss"; // keep this, even as WeekView/MonthView have their own files

function Schedule() {
  const { setAppointments } = useAppData();

  const [weekOffset, setWeekOffset] = useState(0);
  const [viewMode, setViewMode] = useState<"week" | "month">("week");

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [startTime, setStartTime] = useState("12:00");
  const [endTime, setEndTime] = useState("13:00");
  const [color, setColor] = useState("blue");

  const handleAddAppointment = () => {
    if (!title.trim()) return;
    setAppointments((prev) => [
      ...prev,
      {
        id: Date.now(),
        title,
        date,
        startTime,
        endTime,
        color,
      },
    ]);
    setShowModal(false);
    resetModal();
  };

  const resetModal = () => {
    setTitle("");
    setStartTime("12:00");
    setEndTime("13:00");
    setDate(new Date().toISOString().split("T")[0]);
    setColor("blue");
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex gap-2">
          {viewMode === "week" && (
            <>
              <Button variant="outline-secondary" onClick={() => setWeekOffset(weekOffset - 1)}>
                ← Previous
              </Button>
              <Button variant="outline-secondary" onClick={() => setWeekOffset(weekOffset + 1)}>
                Next →
              </Button>
            </>
          )}
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Add Appointment
          </Button>
        </div>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" id="view-toggle">
            View: {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setViewMode("week")}>Week View</Dropdown.Item>
            <Dropdown.Item onClick={() => setViewMode("month")}>Month View</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {viewMode === "week" ? <WeekView weekOffset={weekOffset} /> : <MonthView />}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Start Time</Form.Label>
              <Form.Control type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Time</Form.Label>
              <Form.Control type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Color</Form.Label>
              <Form.Select value={color} onChange={(e) => setColor(e.target.value)}>
                <option value="blue">Blue</option>
                <option value="yellow">Yellow</option>
                <option value="red">Red</option>
                <option value="orange">Orange</option>
                <option value="purple">Purple</option>
                <option value="green">Green</option>
                <option value="pink">Pink</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddAppointment}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Schedule;
