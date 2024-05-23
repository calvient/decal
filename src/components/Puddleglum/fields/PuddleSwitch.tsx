import {InfoIcon} from '@chakra-ui/icons';
import {FormControl, FormErrorMessage, FormLabel, Switch, Tooltip} from '@chakra-ui/react';
import {PuddleBag} from '../types/types';

interface PuddleSwitchProps<TRequest> {
  form: PuddleBag<TRequest>;
  label: string;
  fieldName: keyof TRequest;
  isRequired?: boolean;
  informationalText?: string;
}

const PuddleSwitch = <TRequest,>({
  form,
  label,
  fieldName,
  isRequired = false,
  informationalText,
}: PuddleSwitchProps<TRequest>) => {
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
      <Switch
        isChecked={form.model && (form.model[fieldName as unknown as keyof TRequest] as boolean)}
        onChange={(e) => form.updateField(fieldName, e.target.checked)}
        onBlur={(e) => form.validateField(fieldName, e.target.checked)}
      />
      {form.fieldHasError(fieldName) && (
        <FormErrorMessage fontSize='xs'>{form.getFieldError(fieldName)}</FormErrorMessage>
      )}
    </FormControl>
  );
};
export default PuddleSwitch;
