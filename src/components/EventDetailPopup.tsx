import { useAppData, Appointment } from "../AppDataContext";
import { useRef, useEffect } from "react";

interface Props {
  event: Appointment;
  onClose: () => void;
  onEdit: (appointment: Appointment) => void;
  anchorRect: DOMRect;
}

export default function EventDetailPopup({ event, onClose, onEdit, anchorRect }: Props) {
  const { setAppointments } = useAppData();
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleDelete = () => {
    setAppointments(prev => prev.filter(a => a.id !== event.id));
    onClose();
  };

  const style: React.CSSProperties = {
    top: anchorRect.top + window.scrollY + anchorRect.height + 6,
    left: anchorRect.left + window.scrollX,
  };

  return (
    <div className="event-detail-popup shadow" style={style} ref={popupRef}>
      <div className="popup-header">
        <div className="action-buttons">
          <button className="circle-btn" onClick={onClose} title="Close">✕</button>
          <button className="circle-btn" onClick={handleDelete} title="Delete">🗑️</button>
          <button className="circle-btn" onClick={() => onEdit(event)} title="Edit">✏️</button>
        </div>
      </div>
      <div className="popup-body">
        <h6 style={{ color: `var(--${event.color})` }}>{event.title}</h6>
        <p className="mb-1"><strong>Date:</strong> {event.date}</p>
        <p><strong>Time:</strong> {event.startTime} – {event.endTime}</p>
      </div>
    </div>
  );
}
