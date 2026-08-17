 import { useState } from "react";
import "./Calendar.css";
import EventForm from "./EventForm";

function Calendar() {
  const [selectedDate, setSelectedDate] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();

  const firstDay = new Date(
    currentYear,
    currentMonth,
    1
  ).getDay();

  const dates = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  );

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  function goToPreviousMonth() {
    setCurrentDate(
      new Date(currentYear, currentMonth - 1, 1)
    );
    setSelectedDate("");
  }

  function goToNextMonth() {
    setCurrentDate(
      new Date(currentYear, currentMonth + 1, 1)
    );
    setSelectedDate("");
  }

  function addEvent(newEvent) {
    setLoading(true);

    setTimeout(() => {
      setEvents((previousEvents) => [
        ...previousEvents,
        newEvent,
      ]);

      setLoading(false);
    }, 1000);
  }

  const selectedEvents = events.filter(
    (event) => event.date === selectedDate
  );

  return (
    <div className="calendar-container">
      <h1 className="calendar-title">
        React Calendar Widget
      </h1>

      <div className="calendar-header">
        <button
          type="button"
          onClick={goToPreviousMonth}
          aria-label="Go to previous month"
        >
          Previous
        </button>

        <h2>
          {monthName} {currentYear}
        </h2>

        <button
          type="button"
          onClick={goToNextMonth}
          aria-label="Go to next month"
        >
          Next
        </button>
      </div>

      <p className="selected-date">
        Selected Date:{" "}
        {selectedDate || "No date selected"}
      </p>

      <div className="weekdays">
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
      </div>

      <div className="calendar-grid">
        {Array.from({ length: firstDay }).map(
          (_, index) => (
            <span
              className="empty-day"
              key={`empty-${index}`}
            />
          )
        )}

        {dates.map((date) => (
          <button
            type="button"
            className={`calendar-day ${
              selectedDate === date ? "selected" : ""
            }`}
            key={date}
            onClick={() => setSelectedDate(date)}
            aria-label={`Select ${monthName} ${date}, ${currentYear}`}
          >
            {date}
          </button>
        ))}
      </div>

      {selectedDate && (
        <EventForm
          selectedDate={selectedDate}
          onAddEvent={addEvent}
        />
      )}

      {loading && (
        <p
          className="loading"
          aria-live="polite"
        >
          Loading...
        </p>
      )}

      {!loading &&
        selectedDate &&
        selectedEvents.length === 0 && (
          <p>No data found</p>
        )}

      {!loading &&
        selectedEvents.map((event, index) => (
          <p key={index}>{event.name}</p>
        ))}
    </div>
  );
}

export default Calendar;