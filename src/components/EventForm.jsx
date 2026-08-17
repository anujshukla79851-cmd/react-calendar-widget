 import { useState } from "react";

function EventForm({ selectedDate, onAddEvent }) {
  const [eventName, setEventName] = useState("");
  const [error, setError] = useState("");

  function sanitizeInput(value) {
    return value
      .replace(/</g, "")
      .replace(/>/g, "")
      .replace(/"/g, "")
      .replace(/'/g, "");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const cleanName = sanitizeInput(eventName).trim();

    if (!cleanName) {
      setError("Event name is required");
      return;
    }

    onAddEvent({
      date: selectedDate,
      name: cleanName,
    });

    console.log(
      "[Analytics] User interacted with React Calendar Widget"
    );

    setEventName("");
    setError("");
  }

  function handleChange(event) {
    const cleanValue = sanitizeInput(event.target.value);

    setEventName(cleanValue);
    setError("");
  }

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <label htmlFor="event-name">
        Event Name
      </label>

      <input
        id="event-name"
        type="text"
        value={eventName}
        onChange={handleChange}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? "event-error" : undefined
        }
      />

      {error && (
        <p id="event-error" className="form-error">
          {error}
        </p>
      )}

      <button type="submit">
        Add Event
      </button>
    </form>
  );
}

export default EventForm;