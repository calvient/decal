import {InfoIcon} from '@chakra-ui/icons';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  TextareaProps,
  Tooltip,
} from '@chakra-ui/react';
import {PuddleBag} from '../types/types';

interface PuddleTextareaProps<TRequest> {
  form: PuddleBag<TRequest>;
  label: string;
  fieldName: keyof TRequest;
  informationalText?: string;
  isRequired?: boolean;
  textareaProps?: TextareaProps;
}

const PuddleTextarea = <TRequest,>({
  form,
  label,
  fieldName,
  informationalText,
  isRequired = false,
  textareaProps = {},
}: PuddleTextareaProps<TRequest>) => {
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
      <Textarea
        bgColor='white'
        value={
          form.model && form.model[fieldName as unknown as keyof TRequest]
            ? (form.model[fieldName as unknown as keyof TRequest] as string)
            : ''
        }
        onChange={(e) => form.updateField(fieldName, e.target.value)}
        onBlur={(e) => form.validateField(fieldName, e.target.value)}
        {...textareaProps}
      />
      {form.fieldHasError(fieldName) && (
        <FormErrorMessage fontSize='xs'>{form.getFieldError(fieldName)}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default PuddleTextarea;
