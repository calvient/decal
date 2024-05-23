import {QuestionIcon} from '@chakra-ui/icons';
import {Box, FormControl, FormErrorMessage, FormLabel, Tooltip} from '@chakra-ui/react';
import {Mention, MentionsInput} from 'react-mentions';
import {PuddleBag} from '../types/types';

interface PuddleFormMentionFieldProps<TRequest> {
  form: PuddleBag<TRequest>;
  label: string;
  options: Array<{id: string; display: string}>;
  hideTitle?: boolean;
  helpText?: string;
  fieldName: keyof TRequest;
  disabled?: boolean;
}

const PuddleFormMentionField = <TRequest,>({
  form,
  label,
  options,
  hideTitle = false,
  helpText,
  fieldName,
  disabled = false,
}: PuddleFormMentionFieldProps<TRequest>) => {
  return (
    <Box
      w='full'
      sx={{
        div: {
          borderRadius: 'lg',
        },
        ul: {
          borderRadius: 'lg',
          boxShadow: 'lg',
        },
      }}
    >
      <FormControl isInvalid={form.fieldHasError(fieldName)}>
        {!hideTitle && (
          <FormLabel htmlFor={String(fieldName)} color='gray.500'>
            {label}
            {helpText && (
              <Tooltip hasArrow label={helpText} aria-label='A tooltip' placement='right'>
                <QuestionIcon ml={1} />
              </Tooltip>
            )}
          </FormLabel>
        )}
        <Box borderRadius='md' border='solid 1px' borderColor='gray.200' p={4}>
          <MentionsInput
            disabled={disabled}
            value={form.model ? (form.model[fieldName as unknown as keyof TRequest] as string) : ''}
            onChange={(e) => {
              if (!form.model || !form.setModel) return;
              form.setModel({
                ...form.model,
                [fieldName]: e.target.value,
              });
            }}
          >
            <Mention
              className='mention'
              trigger='@'
              markup='@(__display__)'
              data={options}
              displayTransform={(suggestion) => `@${suggestion}`}
              renderSuggestion={(_suggestion, _search, highlightedDisplay, _index, focused) => (
                <Box
                  m={0}
                  px={4}
                  py={2}
                  backgroundColor={focused ? 'blue.50' : ''}
                  borderRadius='md'
                >
                  {highlightedDisplay}
                </Box>
              )}
            />
          </MentionsInput>
        </Box>
        {form.fieldHasError(fieldName) && (
          <FormErrorMessage fontSize='xs'>{form.getFieldError(fieldName)}</FormErrorMessage>
        )}
      </FormControl>
    </Box>
  );
};

export default PuddleFormMentionField;
