import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface DatePickerComponentProps {
  onFromValueChange: (value: Dayjs | null) => void;
  onToValueChange: (value: Dayjs | null) => void;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  onFromValueChange,
  onToValueChange,
}) => {
  const today = dayjs(); // gets today's date for default value
  const [fromValue, setFromValue] = useState<Dayjs | null>(today);
  const [toValue, setToValue] = useState<Dayjs | null>(today);

  const handleFromValueChange = (newValue: Dayjs | null) => {
    if (newValue) {
      setFromValue(newValue);
      onFromValueChange(newValue);
    }
  };

  const handleToValueChange = (newValue: Dayjs | null) => {
    if (newValue) {
      setToValue(newValue);
      onToValueChange(newValue);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <div>
          <DatePicker
            label="From"
            defaultValue={today}
            value={fromValue}
            onChange={(newValue) => handleFromValueChange(newValue)}
          />
          <DatePicker
            label="To"
            defaultValue={today}
            value={toValue}
            onChange={(newValue) => handleToValueChange(newValue)}
          />
        </div>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
