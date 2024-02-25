import usePuddleForm from '../../components/Puddleglum/hooks/usePuddleForm.ts';
import {Model, puddleStore, puddleUpdate} from '../mocks.ts';
import PuddleInput from '../../components/Puddleglum/fields/PuddleInput.tsx';
import {Container, Button, VStack, useToast} from '../../index.ts';
import PuddleSelect from '../../components/Puddleglum/fields/PuddleSelect.tsx';
import PuddleTextarea from '../../components/Puddleglum/fields/PuddleTextarea.tsx';
import PuddleSwitch from '../../components/Puddleglum/fields/PuddleSwitch.tsx';
import PuddleDate from '../../components/Puddleglum/fields/PuddleDate.tsx';
import PuddleDaySelector from '../../components/Puddleglum/fields/PuddleDaySelector.tsx';
import PuddleMultipleSelect from '../../components/Puddleglum/fields/PuddleMultipleSelect.tsx';
import PuddleAutocomplete from '../../components/Puddleglum/fields/PuddleAutocomplete.tsx';
import PuddleMaskedInput from '../../components/Puddleglum/fields/PuddleMaskedInput.tsx';
import PuddleTagInput from '../../components/Puddleglum/fields/PuddleTagInput.tsx';

const model: Model = {
  assignees: [],
  is_enabled: false,
  day: 'MTW',
  date: '',
  description: 'Test Description',
  id: 0,
  name: 'Test Field',
  state: 'CA',
  tags: ['Apple', 'Google', 'Microsoft', 'Calvient'],
  phone: '',
};

const PuddleFormScreen = () => {
  const toast = useToast();

  const form = usePuddleForm<Model>({
    initialValues: model,
    storeFunction: puddleStore,
    updateFunction: puddleUpdate,
  });

  const handleSave = async () => {
    try {
      const newModel = await form.save();

      toast({
        title: 'Success',
        description: `ID ${newModel.id} saved successfully`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container p={8}>
      <VStack w={'full'} spacing={4}>
        <PuddleInput form={form} label={'Name'} fieldName={'name'} />
        <PuddleMaskedInput
          form={form}
          mask='(000) 000-0000'
          type='tel'
          label='Phone Number'
          fieldName={'phone'}
        />
        <PuddleSelect
          form={form}
          label={'State'}
          options={[
            {label: 'California', value: 'CA'},
            {label: 'New York', value: 'NY'},
          ]}
          fieldName={'state'}
        />
        <PuddleTextarea form={form} label={'Description'} fieldName={'description'} />
        <PuddleDate form={form} label={'Date'} startYear={2020} endYear={2030} fieldName={'date'} />
        <PuddleDaySelector form={form} label={'Day'} fieldName={'day'} />
        <PuddleMultipleSelect
          form={form}
          label={'Assignees'}
          options={[
            {label: 'John Doe', value: 'John Doe'},
            {label: 'Jane Doe', value: 'Jane Doe'},
            {label: 'John Smith', value: 'John Smith'},
            {label: 'Jane Smith', value: 'Jane Smith'},
          ]}
          fieldName={'assignees'}
        />
        <PuddleAutocomplete
          form={form}
          label={'Assignees'}
          options={[
            {label: 'John Doe', value: 'John Doe'},
            {label: 'Jane Doe', value: 'Jane Doe'},
            {label: 'John Smith', value: 'John Smith'},
            {label: 'Jane Smith', value: 'Jane Smith'},
          ]}
          fieldName={'assignees'}
        />
        <PuddleTagInput form={form} label={'Tags'} fieldName={'tags'} />
        <PuddleSwitch form={form} label={'Is Enabled?'} fieldName={'is_enabled'} />
      </VStack>
      <Button mt={8} w={'full'} colorScheme={'blue'} type={'submit'} onClick={handleSave}>
        Save
      </Button>
    </Container>
  );
};

export default PuddleFormScreen;
