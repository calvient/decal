import {Button, FormControl, FormErrorMessage, FormLabel, HStack} from '@chakra-ui/react';
import {PuddleBag} from '../types/types.ts';

interface PuddleDaySelectorProps<TRequest> {
  form: PuddleBag<TRequest>;
  label: string;
  fieldName: keyof TRequest;
  allowWeekends?: boolean;
  isRequired?: boolean;
  disabled?: boolean;
}

const PuddleDaySelector = <TRequest,>({
  form,
  label,
  fieldName,
  allowWeekends = false,
  disabled,
  isRequired = false,
}: PuddleDaySelectorProps<TRequest>) => {
  // @ts-expect-error - We are just getting the date from the model
  const daysOfWeek: string = form.model && fieldName in form.model ? form.model[fieldName] : '';

  const isDaySelected = (day: string) => daysOfWeek.includes(day);

  const toggleDay = (day: string) => {
    if (isDaySelected(day)) {
      form.updateField(fieldName, daysOfWeek.replace(day, ''));
    } else {
      form.updateField(fieldName, daysOfWeek + day);
    }
  };

  return (
    <FormControl isInvalid={form.fieldHasError(fieldName)} isRequired={isRequired}>
      <FormLabel color='gray.500'>{label}</FormLabel>
      <HStack>
        <Button
          size='sm'
          disabled={disabled || !allowWeekends}
          colorScheme={isDaySelected('U') ? 'blue' : 'gray'}
          onClick={() => toggleDay('U')}
        >
          Sun
        </Button>
        <Button
          size='sm'
          disabled={disabled}
          colorScheme={isDaySelected('M') ? 'blue' : 'gray'}
          onClick={() => toggleDay('M')}
        >
          Mon
        </Button>
        <Button
          size='sm'
          disabled={disabled}
          colorScheme={isDaySelected('T') ? 'blue' : 'gray'}
          onClick={() => toggleDay('T')}
        >
          Tue
        </Button>
        <Button
          size='sm'
          disabled={disabled}
          colorScheme={isDaySelected('W') ? 'blue' : 'gray'}
          onClick={() => toggleDay('W')}
        >
          Wed
        </Button>
        <Button
          size='sm'
          disabled={disabled}
          colorScheme={isDaySelected('R') ? 'blue' : 'gray'}
          onClick={() => toggleDay('R')}
        >
          Thu
        </Button>
        <Button
          size='sm'
          disabled={disabled}
          colorScheme={isDaySelected('F') ? 'blue' : 'gray'}
          onClick={() => toggleDay('F')}
        >
          Fri
        </Button>
        <Button
          size='sm'
          disabled={disabled || !allowWeekends}
          colorScheme={isDaySelected('S') ? 'blue' : 'gray'}
          onClick={() => toggleDay('S')}
        >
          Sat
        </Button>
      </HStack>
      {form.fieldHasError(fieldName) && (
        <FormErrorMessage fontSize='xs'>{form.getFieldError(fieldName)}</FormErrorMessage>
      )}
    </FormControl>
  );
};
export default PuddleDaySelector;
