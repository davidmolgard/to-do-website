import { useAppData } from "../AppDataContext";
import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const COLORS = ["blue", "yellow", "red", "orange", "purple", "green", "pink"];

export default function AddAppointmentModal({ show, onClose }: { show: boolean; onClose: () => void }) {
  const { setAppointments } = useAppData();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [startTime, setStartTime] = useState("12:00");
  const [endTime, setEndTime] = useState("13:00");
  const [color, setColor] = useState("blue");

  const handleAdd = () => {
    if (!title.trim()) return;
    setAppointments(prev => [
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
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
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
          <Form.Group>
            <Form.Label>Color</Form.Label>
            <Form.Select value={color} onChange={(e) => setColor(e.target.value)}>
              {COLORS.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleAdd}>Add</Button>
      </Modal.Footer>
    </Modal>
  );
}
