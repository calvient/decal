import {useEffect, useMemo, useState} from 'react';
import {FormControl, FormErrorMessage, FormLabel, HStack, Select} from '@chakra-ui/react';
import {getDaysInMonth} from 'date-fns/getDaysInMonth';
import Months from '../../enums/Months';
import {PuddleBag} from '../types/types';

interface PuddleDateProps<TRequest> {
  form: PuddleBag<TRequest>;
  label: string;
  startYear: number;
  endYear: number;
  fieldName: keyof TRequest;
  isRequired?: boolean;
}

const PuddleDate = <TRequest,>({
  form,
  label,
  fieldName,
  startYear,
  endYear,
  isRequired = false,
}: PuddleDateProps<TRequest>) => {
  // @ts-expect-error - We are just getting the date from the model
  const dateString: string = form.model && fieldName in form.model ? form.model[fieldName] : '';
  const dateParts = dateString?.split(/[-/]/) ?? '';

  const [day, setDay] = useState<number | undefined>(
    dateParts.length === 3 ? Number(dateParts[2]) : undefined
  );
  const [year, setYear] = useState<number | undefined>(
    dateParts.length === 3 ? Number(dateParts[0]) : undefined
  );
  const [month, setMonth] = useState<number | undefined>(
    dateParts.length === 3 ? Number(dateParts[1]) : undefined
  );
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

    form.updateField(fieldName, formattedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- we don't want form to be a dependency, we only want to run this when the date changes
  }, [fieldName, formattedDate]);

  return (
    <FormControl isInvalid={form.fieldHasError(fieldName)} isRequired={isRequired}>
      <FormLabel color='gray.500'>{label}</FormLabel>

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

      {form.fieldHasError(fieldName) && (
        <FormErrorMessage fontSize='xs'>{form.getFieldError(fieldName)}</FormErrorMessage>
      )}
    </FormControl>
  );
};
export default PuddleDate;
