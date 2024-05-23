import {useEffect, useState} from 'react';
import {Checkbox, FormControl, FormErrorMessage, FormLabel, Wrap, WrapItem} from '@chakra-ui/react';
import {PuddleBag} from '../types/types';

interface PuddleMultipleSelectProps<TRequest> {
  form: PuddleBag<TRequest>;
  label: string;
  initialValues?: Array<string | number>;
  options: {label: string; value: string | number}[];
  fieldName: keyof TRequest;
  isRequired?: boolean;
  width?: string;
}

const PuddleMultipleSelect = <TRequest,>({
  form,
  label,
  fieldName,
  initialValues = [],
  options,
  isRequired = false,
  width = '160px',
}: PuddleMultipleSelectProps<TRequest>) => {
  const [currentValues, setCurrentValues] = useState<Array<string | number>>(initialValues);

  const handleClickedOption = (value: number | string) => {
    if (currentValues.some((v) => v === value)) {
      setCurrentValues(currentValues.filter((v) => v !== value));
    } else {
      setCurrentValues([...currentValues, value]);
    }
  };

  useEffect(() => {
    form.updateField(fieldName, currentValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- this only runs when currentValues changes
  }, [currentValues.length]);

  return (
    <FormControl isInvalid={form.fieldHasError(fieldName)} isRequired={isRequired}>
      <FormLabel color='gray.500'>{label}</FormLabel>
      {form.fieldHasError(fieldName) && (
        <FormErrorMessage fontSize='xs'>{form.getFieldError(fieldName)}</FormErrorMessage>
      )}
      <Wrap>
        {options.map((option) => (
          <WrapItem key={option.value} w={width}>
            <Checkbox
              value={option.value}
              isChecked={currentValues.some((v) => v === option.value)}
              onChange={() => handleClickedOption(option.value)}
            >
              {option.label}
            </Checkbox>
          </WrapItem>
        ))}
      </Wrap>
    </FormControl>
  );
};

export default PuddleMultipleSelect;
