import React, { useState, useEffect } from "react";

const SelectDropDownOptions = ({ gender, setGender, json_file_name, label_text, label_id, mode }) => {

  const [jsonoptions, setJsonOptions] = useState([]);

  useEffect(() => {
    const fetchJsonOptions = async () => {
      try {
        const response = await fetch(json_file_name);
        if (response.ok) {
          const data = await response.json();
          setJsonOptions(data.options);
        } else {
        console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchJsonOptions();
  }, []);

  return (
      <div className="ResumeCreation-form-group">
          <label htmlFor={label_id}>{label_text}</label>
          {mode === 'submit' ? (
             <span>{gender}</span>
          ) : (
            <select
              name={label_id}
              id={label_id}
              style={{ width: "10rem", cursor: "pointer" }}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="custom-select"
            >
              <option value="" disabled selected style={{ cursor: "pointer" }}>
                ---Επιλέξτε ένα---
              </option>
              {jsonoptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          )}
      </div>
  );
};

export default SelectDropDownOptions;