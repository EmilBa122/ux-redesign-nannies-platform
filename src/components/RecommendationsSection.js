import React from "react";

import Box from '@mui/system/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import CancelIcon from "@mui/icons-material/Cancel";

export default function RecommendationsSection({elements, setElements}) {

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        setElements((prevElements) => [...prevElements, ...newFiles]); 
    };

    const handleRemoveFile = (fileToRemove) => {
        setElements(elements.filter((element) => element !== fileToRemove));
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
            <div className="ResumeCreation-form-group">
            <label
                htmlFor="file-upload"
                className="ResumeCreation-icon-button"
                style={{
                border: "2px solid #000",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                backgroundColor: "#EFEFEF",
                }}
            >
                <img
                src="/content/icons/upload_files_icon.png"
                alt="upload files"
                className="ResumeCreation-icon"
                />
                <span className="ResumeCreation-button-text">Ανέβασμα αρχείου/ων</span>
            </label>
            <input
                id="file-upload"
                type="file"
                style={{ display: "none" }} 
                multiple
                accept=".pdf,.txt,.doc,.docx"
                onChange={handleFileChange}
            />
            </div>

            {/* Showing existing elements */}
            {elements.length > 0 && (
            <Box mt={2}>
                <Stack
                direction="column" 
                spacing={2} 
                >
                {elements.map((element, index) => (
                    <Chip
                    key={index}
                    label={element.name} 
                    onDelete={() => handleRemoveFile(element)} 
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
                </Stack>
            </Box>
            )}
        </Stack>
    </Box>

    );
}

