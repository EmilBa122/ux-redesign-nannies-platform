import React, { useState, useEffect } from 'react';

import { TextField, Autocomplete, MenuItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const ServiceAreasSection = ({ serviceareas, setServiceAreas, id}) => {

    const [names, setNames] = useState([]);

    useEffect(() => {
        const fetchNames = async () => {
            try {
                const response = await fetch('/data/areas.json');
                if (response.ok) {
                const data = await response.json();
                setNames(data.areas);
                } else {
                console.error('Failed to fetch areas');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchNames();  
    }, []); 

    return (
        // The below code is from
        // https://muhimasri.com/blogs/mui-multiselect/ 
        <div>
            <Autocomplete
                sx={{ m: 1, width: 500 }}
                multiple
                options={names}
                getOptionLabel={(option) => option}
                disableCloseOnSelect
                value={serviceareas}
                onChange={(e, value) => setServiceAreas(value)}
                renderInput={(params) => (
                <TextField
                    {...params}
                    variant="outlined"
                    label=""
                    placeholder="Επιλέξτε Περιοχές Εξυπηρέτησης*"
                    required
                    id={id}
                />
                )}
                renderOption={(props, option, { selected }) => (
                <MenuItem
                    {...props}
                    key={option}
                    value={option}
                    sx={{ justifyContent: "space-between" }}
                >
                    {option}
                    {selected ? <CheckIcon color="info" /> : null}
                </MenuItem>
                )}
            />
        </div>
    );
};

export default ServiceAreasSection;