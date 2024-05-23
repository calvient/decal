import {FC, useEffect, useMemo, useState} from 'react';
import {HStack, Select} from '@chakra-ui/react';
import {getDaysInMonth} from 'date-fns/getDaysInMonth';
import Months from './enums/Months';

interface DateGranularPickerProps {
  startYear: number;
  endYear: number;
  onChange: (date: string) => void;
}

const DateGranularPicker: FC<DateGranularPickerProps> = ({startYear, endYear, onChange}) => {
  const [day, setDay] = useState<number | undefined>();
  const [year, setYear] = useState<number | undefined>();
  const [month, setMonth] = useState<number | undefined>();
  const years = Array.from(Array(endYear - startYear + 1), (_, i) => i + startYear);
  const numberOfDays = year && month ? getDaysInMonth(new Date(year, month)) : 31;

  const formattedDate = useMemo(() => {
    if (!year || !month || !day) {
      return null;
    }
    return `${year}-${month}-${day}`;
  }, [year, month, day]);

  useEffect(() => {
    if (!formattedDate) return;

    onChange(formattedDate);
  }, [formattedDate]);

  return (
    <HStack mt={2}>
      <Select
        bgColor='white'
        placeholder='Month'
        value={month}
        onChange={(e) => setMonth(Number(e.currentTarget.value))}
      >
        {Months.map((monthName, index) => (
          <option key={monthName} value={index + 1}>
            {monthName}
          </option>
        ))}
      </Select>
      <Select
        bgColor='white'
        placeholder='Day'
        value={day}
        onChange={(e) => setDay(Number(e.currentTarget.value))}
      >
        {[...Array(numberOfDays).keys()].map((_, selectDay) => (
          <option key={selectDay}>{selectDay + 1}</option>
        ))}
      </Select>
      <Select
        bgColor='white'
        placeholder='Year'
        value={year}
        onChange={(e) => setYear(Number(e.currentTarget.value))}
      >
        {years.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </HStack>
  );
};
export default DateGranularPicker;
