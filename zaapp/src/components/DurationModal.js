import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DurationModal = ({ isOpen, onClose, onSave }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSave = () => {
    if (startDate && endDate) {
      onSave({ startDate, endDate });
      onClose();
    } else {
      alert("Please select both start and end dates.");
    }
  };

  return (
    isOpen && (
      <div className="modal-container">
        <div className="modal-content">
          <h2>Select Duration</h2>
          <div className="date-picker-container">
            <label>Start Date:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          </div>
          <div className="date-picker-container">
            <label>End Date:</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </div>
          <div className="modal-actions">
            <button onClick={onClose}>Cancel</button>
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    )
  );
};

export default DurationModal;
