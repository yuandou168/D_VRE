import React, { useState } from "react";
import { Select, MenuItem, FormControl, InputLabel, Box, SelectChangeEvent } from "@mui/material";

interface File {
  name: string;
  IPFSHash: string;
}

interface FileSelectProps {
  files: File[];
  onSelect: (selectedFiles: File[]) => void;
}

const FileSelect: React.FC<FileSelectProps> = ({ files, onSelect }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileSelect = (event: SelectChangeEvent<string[]>) => {
    const selectedFileIds = event.target.value;
    const selectedFiles = files.filter((file) => selectedFileIds.includes(file.IPFSHash));
    setSelectedFiles(selectedFiles);
    onSelect(selectedFiles);
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel>Select Files</InputLabel>
        <Select
            multiple
            value={selectedFiles.map((file) => file.IPFSHash)}
            onChange={handleFileSelect} // Update the event type
            label="Select Files"
            placeholder="Select Files"
          >
          {files.map((file) => (
            <MenuItem key={file.IPFSHash} value={file.IPFSHash}>
              {file.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FileSelect;
