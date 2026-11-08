import React, { useState, useEffect } from "react";

import WeeklyScheduleTable from'./WeeklyScheduleTable.js';

const AvailabilitySection = ({ employmenttype, setEmploymentType, schedule, setSchedule, daysOfWeek, hoursOfDay, mode, id }) => {

  const [availability, setAvailability] = useState([]);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await fetch("/data/availability.json");
        if (response.ok) {
          const data = await response.json();
          setAvailability(data.options);
        } else {
        console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchAvailability();
  }, []);

  return (
    <div>
      <div className="AdCreation-form-group">
          <label htmlFor="employment_type">Τύπος Απασχόλησης*</label>
          {mode === 'submit' ? (
             <span>{employmenttype}</span>
          ) : (
            <select
              name="employment_type"
              id="employment_type"
              style={{ width: "10rem", cursor: "pointer" }}
              value={employmenttype}
              onChange={(e) => setEmploymentType(e.target.value)}
              className="custom-select"
              required
            >
              <option value="" disabled selected style={{ cursor: "pointer" }}>
                ---Επιλέξτε ένα---
              </option>
              {availability.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          )}
      </div>
      {(employmenttype === "Μερική" || employmenttype === "Περιστασιακή") ? (
          <div className="AdCreation-form-group">
            {mode === 'submit' ? (
             <label style={{ marginTop: "45px", marginBottom: "10px" }}>Ώρες διαθεσιμότητας μέσα στην εβδομάδα:</label>
            ) : (
              <label style={{ marginTop: "45px", marginBottom: "10px" }}>Επιλέξτε ώρες μέσα στην εβδομάδα*</label>
            )}
            <WeeklyScheduleTable
               schedule={schedule}       
               setSchedule={setSchedule}  
               daysOfWeek={daysOfWeek}     
               hoursOfDay={hoursOfDay}  
               mode={mode}
            />
            <span class="error-message" id="availability_error"></span>
          </div> 
      ) : (
          null
      )} 
    </div>
  );
};

export default AvailabilitySection;