import {InfoIcon} from '@chakra-ui/icons';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
  Tooltip,
} from '@chakra-ui/react';
import {PuddleBag} from '../types/types';

interface PuddleInputProps<TRequest> {
  form: PuddleBag<TRequest>;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  fieldName: keyof TRequest;
  isRequired?: boolean;
  inputProps?: InputProps;
  disabled?: boolean;
  informationalText?: string;
}

const PuddleInput = <TRequest,>({
  form,
  label,
  fieldName,
  type = 'text',
  isRequired = false,
  inputProps = {},
  disabled = false,
  informationalText,
}: PuddleInputProps<TRequest>) => {
  return (
    <FormControl isInvalid={form.fieldHasError(fieldName)} isRequired={isRequired}>
      <FormLabel color='gray.500'>
        {label}
        {informationalText && (
          <Tooltip label={informationalText}>
            <InfoIcon ml={2} />
          </Tooltip>
        )}
      </FormLabel>
      <Input
        bgColor='white'
        type={type}
        value={
          form.model && form.model[fieldName as unknown as keyof TRequest]
            ? (form.model[fieldName as unknown as keyof TRequest] as string)
            : ''
        }
        onChange={(e) => form.updateField(fieldName, e.target.value)}
        onBlur={(e) => form.validateField(fieldName, e.target.value)}
        {...inputProps}
        disabled={disabled}
      />
      {form.fieldHasError(fieldName) && (
        <FormErrorMessage fontSize='xs'>{form.getFieldError(fieldName)}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default PuddleInput;
