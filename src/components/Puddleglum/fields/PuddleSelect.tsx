import {FormControl, FormErrorMessage, FormLabel, Select, SelectProps} from '@chakra-ui/react';
import {PuddleBag} from '../types/types';

interface PuddleSelectProps<TRequest> {
  form: PuddleBag<TRequest>;
  label: string;
  options: {label: string; value: string | number}[];
  fieldName: keyof TRequest;
  isRequired?: boolean;
  disabled?: boolean;
  _selectProps?: SelectProps;
}

const PuddleSelect = <TRequest,>({
  form,
  label,
  fieldName,
  options,
  disabled,
  isRequired = false,
  _selectProps = {},
}: PuddleSelectProps<TRequest>) => {
  return (
    <FormControl isInvalid={form.fieldHasError(fieldName)} isRequired={isRequired}>
      <FormLabel color='gray.500'>{label}</FormLabel>
      <Select
        bgColor='white'
        disabled={disabled}
        placeholder={`Select ${label}`}
        value={
          form.model && form.model[fieldName as unknown as keyof TRequest]
            ? (form.model[fieldName as unknown as keyof TRequest] as string)
            : ''
        }
        onChange={(e) => form.updateField(fieldName, e.target.value)}
        onBlur={(e) => form.validateField(fieldName, e.target.value)}
        {..._selectProps}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>

      {form.fieldHasError(fieldName) && (
        <FormErrorMessage fontSize='xs'>{form.getFieldError(fieldName)}</FormErrorMessage>
      )}
    </FormControl>
  );
};
export default PuddleSelect;
