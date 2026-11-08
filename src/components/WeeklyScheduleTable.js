import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';

export default function WeeklyScheduleTable({ schedule, setSchedule, daysOfWeek, hoursOfDay, mode}) {

  const handleCheckboxChange = (hourIndex, dayIndex) => {

    const updatedSchedule = [];
    
    for (let i = 0; i < hoursOfDay.length; i++) 
    {
        updatedSchedule[i] = [];
        for (let j = 0; j < daysOfWeek.length; j++) 
        {
          if (i === hourIndex && j === dayIndex) 
          {
            updatedSchedule[i][j] = !schedule[i][j];
          } 
          else 
          {
            updatedSchedule[i][j] = schedule[i][j];
          }
        }
    }
    
    setSchedule(updatedSchedule);
  };

  return (
    <div style={{ paddingRight: "1.5rem" }}>
      <TableContainer
        component={Paper}
        style={{ overflowX: "hidden" }}
      >
        <Table >
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>Ώρες</TableCell>
              {daysOfWeek.map((day) => (
                <TableCell key={day} style={{ fontWeight: "bold", textAlign: "center" }}>
                  {day}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {hoursOfDay.map((hour, hourIndex) => (
              <TableRow key={hour}>
                <TableCell style={{ fontWeight: "bold", textAlign: "center", backgroundColor: "#f5f5f5" }}>
                  {hour}
                </TableCell>
                {mode === 'submit' ? (
                  daysOfWeek.map((_, dayIndex) => (
                    <TableCell key={dayIndex} align="center" style={{ border: "1px solid #ddd", padding: "8px" }}>
                      <Checkbox
                        checked={schedule[hourIndex][dayIndex]}
                        disabled
                        sx={{
                          color: "black",
                          "& .MuiSvgIcon-root": {
                            color: schedule[hourIndex][dayIndex] ? "green" : "black"
                          },
                          "&.Mui-checked": {
                            color: "green",
                          }
                        }}
                      />
                    </TableCell>
                  ))
                ) : (
                  daysOfWeek.map((_, dayIndex) => (
                    <TableCell key={dayIndex} align="center" style={{ border: "1px solid #ddd", padding: "8px" }}>
                      <Checkbox
                        checked={schedule[hourIndex][dayIndex]}
                        onChange={() => handleCheckboxChange(hourIndex, dayIndex)}
                        sx={{
                          color: "black",
                          "& .MuiSvgIcon-root": {
                            color: schedule[hourIndex][dayIndex] ? "green" : "black"
                          },
                          "&.Mui-checked": {
                            color: "green",
                          }
                        }}
                      />
                    </TableCell>
                  ))
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
