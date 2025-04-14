import { useAppData } from "../AppDataContext";
import { useState } from "react";
import "../styles/monthView.scss";

function MonthView() {
  const { appointments } = useAppData();
  const [monthOffset, setMonthOffset] = useState(0);

  const baseDate = new Date();
  baseDate.setMonth(baseDate.getMonth() + monthOffset);
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const startDay = new Date(firstDayOfMonth);
  startDay.setDate(startDay.getDate() - startDay.getDay()); // Start from Sunday

  const days: Date[] = [];
  for (let i = 0; i < 42; i++) {
    const day = new Date(startDay);
    day.setDate(startDay.getDate() + i);
    days.push(day);
  }

  return (
    <div className="month-view-container">
      <div className="month-nav d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-outline-secondary" onClick={() => setMonthOffset(monthOffset - 1)}>←</button>
        <h5 className="mb-0">
          {baseDate.toLocaleString(undefined, { month: "long", year: "numeric" })}
        </h5>
        <button className="btn btn-outline-secondary" onClick={() => setMonthOffset(monthOffset + 1)}>→</button>
      </div>

      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="day-label">{d}</div>
        ))}

        {days.map((date) => {
          const dateStr = date.toISOString().split("T")[0];
          const dailyAppointments = appointments.filter((a) => a.date === dateStr);

          return (
            <div key={dateStr} className={`calendar-day ${date.getMonth() !== month ? "other-month" : ""}`}>
              <div className="date-number">{date.getDate()}</div>
              <div className="events-container">
                {dailyAppointments.map((appt) => (
                  <div
                    key={appt.id}
                    className="event-chip"
                    style={{ backgroundColor: `var(--${appt.color})` }}
                    title={`${appt.title} (${appt.startTime}–${appt.endTime})`}
                  >
                    {appt.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MonthView;
