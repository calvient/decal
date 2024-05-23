import React from 'react';
import {InfoIcon} from '@chakra-ui/icons';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
  Tooltip,
} from '@chakra-ui/react';
import {useIMask} from 'react-imask';
import {PuddleBag} from '../types/types';

interface PuddleMaskedInputProps<TRequest> {
  form: PuddleBag<TRequest>;
  mask: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  fieldName: keyof TRequest;
  isRequired?: boolean;
  inputProps?: InputProps;
  disabled?: boolean;
  informationalText?: string;
}

const PuddleMaskedInput = <TRequest,>({
  form,
  mask,
  label,
  fieldName,
  type = 'text',
  isRequired = false,
  inputProps = {},
  disabled = false,
  informationalText,
}: PuddleMaskedInputProps<TRequest>) => {
  const {ref} = useIMask(
    {
      mask,
    },
    {
      onAccept: (value: unknown) => {
        form.updateField(fieldName, value);
      },
    }
  );

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
        ref={ref as React.RefObject<HTMLInputElement>}
        bgColor='white'
        type={type}
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

export default PuddleMaskedInput;
