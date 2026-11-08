import React, { useState } from "react";

import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";


export default function AddingElementsSection({elements, setElements, id = null}) {
  
  const [isAdding, setIsAdding] = useState(false);
  
  const [currentElement, setCurrentElement] = useState("");

  const handleAddElement = () => {
    if (currentElement.trim()) 
    {
      setElements([...elements, currentElement.trim()]);
      setCurrentElement("");
      setIsAdding(false);
    }
  };

  const handleRemoveElement = (elementToRemove) => {
    setElements(elements.filter((element) => element !== elementToRemove));
  };

  return (
    <Box
      p={3}
      style={{ width: "100%" }}
    >
      <Stack
        direction="column"
        spacing={2}
        sx={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        {/* Showing existing elements */}
        {elements.map((element, index) => (
          <Chip
            key={index}
            label={element}
            onDelete={() => handleRemoveElement(element)}
            deleteIcon={<CancelIcon sx={{ fontSize: 22 }} />}
            sx={{
              textAlign: "left",
              padding: "8px 16px", 
              fontSize: "1rem", 
              // code from
              // https://stackoverflow.com/questions/69799175/overriding-mui-chip-deleteicon-color
              "& .MuiChip-deleteIcon": {
                color: "#db2537",
                fontSize: 22,
                "&:hover": {
                  color: "red",
                },
              },
            }}
            />
        ))}

        {/* Add new element section */}
        {isAdding ? (
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <TextField
              id={id}
              variant="outlined"
              size="small"
              placeholder="Enter text"
              value={currentElement}
              onChange={(e) => setCurrentElement(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddElement}
            >
              Προσθηκη
            </Button>
          </Stack>
        ) : (
          // good colors 09B668, 08AD62
          <Button
            variant="text"
            startIcon={<AddIcon sx={{ color: '#059352' }} />}
            onClick={() => setIsAdding(true)}
            sx={{
              color: '#059352', 
              '&:hover': {
                backgroundColor: '#059352',
                color: 'white', 
                '& .MuiSvgIcon-root': {
                  color: 'white', 
                },
              },
            }}
          >
            Προσθηκη
          </Button>
        )}
      </Stack>
    </Box>
  );
}