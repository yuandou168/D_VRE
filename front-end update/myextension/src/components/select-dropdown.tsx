import React, { useState, useMemo } from "react";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  ListSubheader,
  TextField,
  InputAdornment
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface ReusableDropdownProps {
  options: string[];
  defaultOption?: string;
  label: string;
}

const containsText = (text: string, searchText: string) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;


const ReusableDropdown: React.FC<ReusableDropdownProps> = ({
  options,
  defaultOption,
  label
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(
    defaultOption || options[0]
  );

  const [searchText, setSearchText] = useState<string>("");
  const displayedOptions = useMemo(
    () => options.filter((option) => containsText(option, searchText)),
    [searchText, options]
  );

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Box sx={{ m: 10 }}>
      <FormControl fullWidth>
        <InputLabel id="search-select-label">{label}</InputLabel>
        <Select
          MenuProps={{ autoFocus: false }}
          labelId="search-select-label"
          id="search-select-research-assets"
          value={selectedOption}
          label={label}
          onChange={handleOptionChange}// Use the adapted event handler
          onClose={() => setSearchText("")}
          renderValue={() => selectedOption}
        >
          <ListSubheader>
            <TextField
              size="small"
              autoFocus
              placeholder="Type to search..."
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Escape") {
                  e.stopPropagation();
                }
              }}
            />
          </ListSubheader>
          {displayedOptions.map((option, i) => (
            <MenuItem key={i} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ReusableDropdown;
