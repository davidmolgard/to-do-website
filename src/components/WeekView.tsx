import { useAppData } from "../AppDataContext";
import { useEffect, useState } from "react";
import '../styles/weekView.scss';

function WeekView({ weekOffset }: { weekOffset: number }) {
  const { appointments } = useAppData();
  const weekDates = getStartOfWeek(new Date(), weekOffset);

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
                {dayAppointments.map(appt => {
                  const top = ((parseInt(appt.startTime) - 7) * 60 + parseInt(appt.startTime.split(":")[1])) * (1);
                  const height = (parseInt(appt.endTime) - parseInt(appt.startTime)) * 60;

                  return (
                    <div
                      key={appt.id}
                      className="appointment-box"
                      style={{
                        top: `${top}px`,
                        height: `${height}px`,
                        backgroundColor: `var(--${appt.color})`,
                      }}
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
    </div>
  );
}

function getStartOfWeek(baseDate: Date, offset: number): Date[] {
  const start = new Date(baseDate);
  start.setDate(start.getDate() - start.getDay() + offset * 7);
  start.setHours(0, 0, 0, 0);

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

export default WeekView;
