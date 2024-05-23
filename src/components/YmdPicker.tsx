import {FC, useEffect, useMemo, useState} from 'react';
import {HStack, Select, SelectProps} from '@chakra-ui/react';
import {format} from 'date-fns';
import {getDaysInMonth} from 'date-fns/getDaysInMonth';
import Months from './enums/Months';

interface YmdPickerProps extends Omit<SelectProps, 'onChange'> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const YmdPicker: FC<YmdPickerProps> = ({value, defaultValue, onChange, ...selectProps}) => {
  const localDefaultValue = value && value.length > 0 ? value : defaultValue ?? null;
  const [initialYear, initialMonth, initialDay] = localDefaultValue?.split('-') ?? [
    null,
    null,
    null,
  ];
  const [year, setYear] = useState<number>(initialYear ? Number(initialYear) : 1900);
  const [month, setMonth] = useState<number>(initialMonth ? Number(initialMonth) : 1);
  const [day, setDay] = useState<number>(initialDay ? Number(initialDay) : 1);
  const daysInMonth = useMemo(() => {
    if (month && year) {
      return getDaysInMonth(new Date(year, month - 1));
    }
    return 31;
  }, [month, year]);
  const getOrdinal = (n: number) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  useEffect(() => {
    if (year && month && day) {
      const formattedDate = format(new Date(year, month - 1, day), 'yyyy-MM-dd');
      onChange?.(formattedDate);
    }
    // eslint-disable-next-line -- adding setValue will create a loop
  }, [year, month, day]);

  return (
    <HStack w='full'>
      <Select value={year} onChange={(e) => setYear(Number(e.target.value))} {...selectProps}>
        {Array.from({length: 120}, (_, i) => new Date().getFullYear() - i).map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </Select>
      <Select value={month} onChange={(e) => setMonth(Number(e.target.value))} {...selectProps}>
        {Array.from({length: 12}, (_, i) => i + 1).map((m) => (
          <option key={m} value={m}>
            {Months[m - 1]}
          </option>
        ))}
      </Select>
      <Select value={day} onChange={(e) => setDay(Number(e.target.value))} {...selectProps}>
        {Array.from({length: daysInMonth}, (_, i) => i + 1).map((d) => (
          <option key={d} value={d}>
            {getOrdinal(d)}
          </option>
        ))}
      </Select>
    </HStack>
  );
};

export default YmdPicker;
