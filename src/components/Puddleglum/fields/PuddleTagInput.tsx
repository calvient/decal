import {InfoIcon} from '@chakra-ui/icons';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputProps,
  Tag,
  Tooltip,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import {MdCancel} from 'react-icons/md';
import {PuddleBag} from '../types/types';

interface PuddleTagInputProps<TRequest> {
  form: PuddleBag<TRequest>;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  fieldName: keyof TRequest;
  isRequired?: boolean;
  inputProps?: InputProps;
  disabled?: boolean;
  informationalText?: string;
}

const PuddleTagInput = <TRequest,>({
  form,
  label,
  fieldName,
  type = 'text',
  isRequired = false,
  inputProps = {},
  disabled = false,
  informationalText,
}: PuddleTagInputProps<TRequest>) => {
  const tags = form.model && form.model[fieldName] ? (form.model[fieldName] as string[]) : [];

  const addTag = (tag: string) => {
    form.updateField(fieldName, [...tags, tag]);
  };

  const removeTag = (tag: string) => {
    form.updateField(
      fieldName,
      tags.filter((t) => t !== tag)
    );
  };

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
        {...inputProps}
        disabled={disabled}
        // on Enter or Tab, add the tag to the list
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === 'Tab') {
            e.preventDefault();
            if (e.currentTarget.value) {
              addTag(e.currentTarget.value);
              e.currentTarget.value = '';
            }
          }
        }}
      />
      {form.fieldHasError(fieldName) && (
        <FormErrorMessage fontSize='xs'>{form.getFieldError(fieldName)}</FormErrorMessage>
      )}
      <Wrap mt={4}>
        {tags?.map((tag) => (
          <WrapItem key={tag}>
            <Tag py={1} pl={4} pr={2}>
              {tag}
              <IconButton
                m={0}
                p={0}
                aria-label={`Remove ${tag}`}
                size='xs'
                icon={<MdCancel />}
                onClick={() => removeTag(tag)}
              />
            </Tag>
          </WrapItem>
        ))}
      </Wrap>
    </FormControl>
  );
};

export default PuddleTagInput;
