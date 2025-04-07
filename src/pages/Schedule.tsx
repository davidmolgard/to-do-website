import { useAppData } from "../AppDataContext";
import { useState } from "react";
import {
  Container,
  Button,
  Modal,
  Form,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import HighlightHeader, { colors, highlightTypes } from "../components/highlightHeader";
import "../styles/schedule.scss"; // We'll add custom styles here

interface Appointment {
  id: number;
  title: string;
  time: string;
  date: string; // ISO format
}

function Schedule() {
	const { appointments, setAppointments } = useAppData();
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDateStr, setSelectedDateStr] = useState(getStartOfWeek(new Date(), 0)[new Date().getDay()].toISOString().split("T")[0]);

  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTime, setNewTime] = useState("12:00");

  const currentWeekDates = getStartOfWeek(new Date(), weekOffset);

  const addAppointment = () => {
    if (!newTitle.trim()) return;
    setAppointments([
      ...appointments,
      {
        id: Date.now(),
        title: newTitle,
        time: newTime,
        date: selectedDateStr,
      },
    ]);
    setShowModal(false);
    setNewTitle("");
    setNewTime("12:00");
  };

  const getAppointmentsForDate = (dateStr: string) =>
    appointments
      .filter((a) => a.date === dateStr)
      .sort((a, b) => a.time.localeCompare(b.time));

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <HighlightHeader text="Weekly Schedule" href={highlightTypes.block} hue={colors.pink} />
        <div className="d-flex gap-2">
          <Button variant="outline-secondary" onClick={() => setWeekOffset(weekOffset - 1)}>
            ← Previous
          </Button>
          <Button variant="outline-secondary" onClick={() => setWeekOffset(weekOffset + 1)}>
            Next →
          </Button>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Add Appointment
          </Button>
        </div>
      </div>

      <div className="horizontal-week">
        {currentWeekDates.map((date, index) => {
          const dateStr = date.toISOString().split("T")[0];
          const isSelected = dateStr === selectedDateStr;
          const dayLabel = date.toLocaleDateString(undefined, {
            weekday: "short",
            day: "numeric",
            month: "short",
          });

          return (
            <div
              key={dateStr}
              className={`day-tab ${isSelected ? "selected" : ""}`}
              onClick={() => setSelectedDateStr(dateStr)}
            >
              {isSelected ? (
                <Card className="day-card shadow">
                  <Card.Header className="fw-bold text-center">
                    {date.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" })}
                  </Card.Header>
                  <Card.Body>
                    {getAppointmentsForDate(dateStr).length > 0 ? (
                      getAppointmentsForDate(dateStr).map((appt) => (
                        <div key={appt.id} className="mb-2">
                          <strong>{appt.time}</strong>: {appt.title}
                        </div>
                      ))
                    ) : (
                      <div className="text-muted">No appointments</div>
                    )}
                  </Card.Body>
                </Card>
              ) : (
                <div className="bookmark-tab">{dayLabel}</div>
              )}
            </div>
          );
        })}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="apptTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Appointment title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="apptTime">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={addAppointment}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Schedule;

function getStartOfWeek(baseDate: Date, offset: number = 0): Date[] {
  const start = new Date(baseDate);
  start.setDate(start.getDate() - start.getDay() + offset * 7);
  start.setHours(0, 0, 0, 0);

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}
