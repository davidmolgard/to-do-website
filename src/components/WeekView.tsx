import { useAppData, Appointment } from "../AppDataContext";
import { useState } from "react";
import EventDetailPopup from "./EventDetailPopup";
import "../styles/weekView.scss";

interface WeekViewProps {
  weekOffset: number;
  onEditAppointment: (appt: Appointment) => void;
}

export default function WeekView({ weekOffset, onEditAppointment }: WeekViewProps) {
  const { appointments } = useAppData();
  const [selectedEvent, setSelectedEvent] = useState<Appointment | null>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

  const weekDates = getStartOfWeek(new Date(), weekOffset);

  const handleEventClick = (appt: Appointment, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setSelectedEvent(appt);
    setAnchorRect(rect);
  };

  return (
    <div className="calendar-week-view">
      <div className="hour-labels">
        {Array.from({ length: 14 }, (_, i) => (
          <div key={i} className="hour">{`${7 + i}:00`}</div>
        ))}
      </div>

      <div className="week-columns">
        {weekDates.map((date) => {
          const dateStr = date.toISOString().split("T")[0];
          const dayAppointments = appointments.filter(a => a.date === dateStr);

          return (
            <div className="day-column" key={dateStr}>
              <div className="day-label">
                {date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
              </div>

              <div className="day-slots">
                {dayAppointments.map((appt) => {
                  const start = parseTime(appt.startTime);
                  const end = parseTime(appt.endTime);
                  const top = (start - 7) * 60; // px
                  const height = (end - start) * 60;

                  return (
                    <div
                      key={appt.id}
                      className="appointment-box"
                      style={{
                        top: `${top}px`,
                        height: `${height}px`,
                        backgroundColor: `var(--${appt.color})`,
                      }}
                      onClick={(e) => handleEventClick(appt, e)}
                    >
                      {appt.title}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {selectedEvent && anchorRect && (
        <EventDetailPopup
          event={selectedEvent}
          anchorRect={anchorRect}
          onClose={() => setSelectedEvent(null)}
          onEdit={(appt) => {
            setSelectedEvent(null);
            onEditAppointment(appt);
          }}
        />
      )}
    </div>
  );
}

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

function parseTime(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h + m / 60;
}
