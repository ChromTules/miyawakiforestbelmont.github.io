import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  MapPin,
  Clock,
} from "lucide-react";
import eventsData from "../content/events.json";
import "../App.css";

function parseDate(value) {
  const raw = String(value || "").slice(0, 10);
  const [year, month, day] = raw.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function dateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function EventDetails({ event, compact = false }) {
  return (
    <article className={compact ? "selected-day-event" : "event-card"}>
      {!compact && (
        <>
          <div className="event-date-badge">
            <span>
              {parseDate(event.date).toLocaleDateString("en-US", {
                month: "short",
              })}
            </span>
            <strong>{parseDate(event.date).getDate()}</strong>
          </div>

          {event.image && (
            <img className="event-card-image" src={event.image} alt="" />
          )}
        </>
      )}

      <div className={compact ? "selected-day-event-content" : "event-card-content"}>
        <h3>{event.title}</h3>

        {(event.startTime || event.endTime) && (
          <p className="event-meta">
            <Clock size={18} />
            <span>
              {event.startTime}
              {event.endTime ? ` - ${event.endTime}` : ""}
            </span>
          </p>
        )}

        {event.location && (
          <p className="event-meta">
            <MapPin size={18} />
            <span>{event.location}</span>
          </p>
        )}

        <p className="event-description">{event.description}</p>

        <div className="event-links">
          {event.rsvpLink && (
            <a href={event.rsvpLink} target="_blank" rel="noopener noreferrer">
              RSVP →
            </a>
          )}
          {event.detailsLink && <a href={event.detailsLink}>More information →</a>}
        </div>
      </div>
    </article>
  );
}

function Events() {
  const events = useMemo(
    () =>
      [...(eventsData.events || [])].sort(
        (a, b) => parseDate(a.date) - parseDate(b.date)
      ),
    []
  );

  const firstEventDate = events.length ? parseDate(events[0].date) : new Date();

  const [currentMonth, setCurrentMonth] = useState(
    new Date(firstEventDate.getFullYear(), firstEventDate.getMonth(), 1)
  );

  const [selectedDate, setSelectedDate] = useState(
    events.length ? String(events[0].date).slice(0, 10) : null
  );

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const eventsByDate = useMemo(() => {
    const map = {};
    events.forEach((event) => {
      const key = String(event.date || "").slice(0, 10);
      if (!map[key]) map[key] = [];
      map[key].push(event);
    });
    return map;
  }, [events]);

  const selectedEvents = selectedDate ? eventsByDate[selectedDate] || [] : [];

  const calendarCells = [];
  for (let i = 0; i < firstDay; i += 1) calendarCells.push(null);
  for (let day = 1; day <= daysInMonth; day += 1) {
    calendarCells.push(new Date(year, month, day));
  }

  const changeMonth = (offset) => {
    const next = new Date(year, month + offset, 1);
    setCurrentMonth(next);
    setSelectedDate(null);
  };

  const selectDay = (date) => {
    setSelectedDate(dateKey(date));
  };

  const selectedDateObject = selectedDate ? parseDate(selectedDate) : null;

  return (
    <div className="events-page">
      <section className="events-section events-section-no-hero">
        <div className="container events-container">
          <div className="events-page-heading">
            <h1>Events</h1>
            <p>Explore upcoming events at the Belmont High School Mini-Forest.</p>
          </div>

          <div className="events-calendar-card">
            <div className="events-calendar-header">
              <button
                type="button"
                onClick={() => changeMonth(-1)}
                aria-label="Previous month"
              >
                <ChevronLeft size={22} />
              </button>

              <h2>
                {currentMonth.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </h2>

              <button
                type="button"
                onClick={() => changeMonth(1)}
                aria-label="Next month"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            <div className="events-weekdays">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>

            <div className="events-calendar-grid">
              {calendarCells.map((date, index) => {
                if (!date) {
                  return (
                    <div
                      className="events-calendar-day empty"
                      key={`empty-${index}`}
                    />
                  );
                }

                const key = dateKey(date);
                const dayEvents = eventsByDate[key] || [];
                const isSelected = selectedDate === key;

                return (
                  <button
                    type="button"
                    className={`events-calendar-day ${
                      dayEvents.length ? "has-event" : ""
                    } ${isSelected ? "selected" : ""}`}
                    key={key}
                    onClick={() => selectDay(date)}
                    aria-label={`Select ${date.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}`}
                  >
                    <span className="events-day-number">{date.getDate()}</span>

                    <div className="events-day-events">
                      {dayEvents.slice(0, 3).map((event) => (
                        <span
                          className="events-calendar-event"
                          key={`${key}-${event.title}`}
                        >
                          {event.title}
                        </span>
                      ))}

                      {dayEvents.length > 3 && (
                        <span className="events-more-count">
                          +{dayEvents.length - 3} more
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedDateObject && (
            <section className="selected-day-panel">
              <div className="selected-day-heading">
                <span>
                  {selectedDateObject.toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
                </span>
                <h2>
                  {selectedDateObject.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </h2>
              </div>

              {selectedEvents.length ? (
                <div className="selected-day-list">
                  {selectedEvents.map((event) => (
                    <EventDetails
                      event={event}
                      compact
                      key={`${event.date}-${event.title}`}
                    />
                  ))}
                </div>
              ) : (
                <p className="selected-day-empty">
                  No events are scheduled for this day.
                </p>
              )}
            </section>
          )}

          <div className="events-upcoming">
            <div className="events-section-heading">
              <CalendarDays size={28} />
              <h2>Upcoming Events</h2>
            </div>

            {events.length === 0 ? (
              <p className="events-empty">No events are currently scheduled.</p>
            ) : (
              <div className="events-list">
                {events.map((event) => (
                  <EventDetails
                    event={event}
                    key={`${event.date}-${event.title}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Events;
