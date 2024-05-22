import {useEffect, useState} from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Tag,
  TagCloseButton,
  TagLabel,
  Wrap,
} from '@chakra-ui/react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';
import {PuddleBag} from '../types/types.ts';

interface PuddleMultipleSelectProps<TRequest> {
  form: PuddleBag<TRequest>;
  label: string;
  options: {label: string; value: string | number}[];
  fieldName: keyof TRequest;
  isRequired?: boolean;
}

const PuddleAutocomplete = <TRequest,>({
  form,
  label,
  fieldName,
  options,
  isRequired = false,
}: PuddleMultipleSelectProps<TRequest>) => {
  const [currentValues, setCurrentValues] = useState<Array<string | number>>(
    (form.model?.[fieldName] as number[]) ?? []
  );

  const selectedOptions = options.filter((option) => currentValues.includes(option.value));

  const handleAddOption = (optionId: string | number) => {
    if (currentValues.includes(optionId)) return;

    setCurrentValues([...currentValues, Number(optionId)]);
  };

  const handleRemoveOption = (optionId: string | number) => {
    setCurrentValues((prev) => prev.filter((id) => id !== optionId));
  };

  useEffect(() => {
    form.updateField(fieldName, [...currentValues]);
  }, [currentValues.length]);

  if (!selectedOptions) return null;

  return (
    <FormControl isInvalid={form.fieldHasError(fieldName)} isRequired={isRequired}>
      <FormLabel color='gray.500'>{label}</FormLabel>
      {form.fieldHasError(fieldName) && (
        <FormErrorMessage fontSize='xs'>{form.getFieldError(fieldName)}</FormErrorMessage>
      )}
      {/* @ts-ignore -- The `any` comes from the vendor package */}
      <AutoComplete rollNavigation onSelectOption={({item}) => handleAddOption(item.value)}>
        <AutoCompleteInput variant='filled' placeholder='Search locations...' autoFocus />
        <AutoCompleteList>
          {options.map((option) => (
            <AutoCompleteItem
              key={option.value}
              value={String(option.value)}
              label={option.label ?? ''}
              textTransform='capitalize'
            >
              {option.label}
            </AutoCompleteItem>
          ))}
        </AutoCompleteList>
      </AutoComplete>

      <Wrap mt={2}>
        {selectedOptions.map((selectedOption) => (
          <Tag
            key={selectedOption.value}
            size='sm'
            borderRadius='full'
            variant='solid'
            colorScheme='pink'
          >
            <TagLabel>{selectedOption.label}</TagLabel>
            <TagCloseButton onClick={() => handleRemoveOption(selectedOption.value)} />
          </Tag>
        ))}
      </Wrap>
    </FormControl>
  );
};

export default PuddleAutocomplete;
