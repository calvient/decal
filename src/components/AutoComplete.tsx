import {FormControl, FormLabel, Tag, TagCloseButton, TagLabel, Wrap} from '@chakra-ui/react';
import {
  AutoComplete as ChakraAutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';

type Option = {label: string; value: string | number};

interface AutoCompleteProps {
  isRequired?: boolean;
  label: string;
  options: Option[];
  values: Array<string | number>;
  onChange: (values: Array<string | number>) => void;
}

const AutoComplete = ({
  isRequired = false,
  label,
  options,
  values,
  onChange,
}: AutoCompleteProps) => {
  const selectedOptions = options.filter((option) => values.includes(option.value));

  const handleAddOption = (optionId: number | string) => {
    if (values.includes(optionId)) return;

    onChange([...values, optionId]);
  };

  const handleRemoveOption = (optionId: number | string) => {
    onChange(values.filter((value) => value !== optionId));
  };

  if (!selectedOptions) return null;

  return (
    <FormControl isRequired={isRequired}>
      <FormLabel color='gray.500'>{label}</FormLabel>
      <ChakraAutoComplete
        rollNavigation
        onSelectOption={({item}: {item: {value: string}}) => handleAddOption(item.value)}
      >
        <AutoCompleteInput variant='filled' placeholder='Search...' autoFocus />
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
      </ChakraAutoComplete>

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

export default AutoComplete;
