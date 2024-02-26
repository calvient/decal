# Introduction
Decal is a React component library that provides a set of reusable components for building web applications that is built on top of Chakra UI.

# Installing Decal
To install Decal, run the following command:
`yarn add @calvient/decal`

# Testing Decal Locally
To test Decal locally, run the following command:
`yarn dev`

Open your browser and navigate to `http://localhost:3000` to see the Decal demo. If you want to use another port, you can  update `vite.config.js`.

# How to Import Chakra UI and other Components
With this library, you do not need to install these packages separately:
- @chakra-ui/react
- react-icons
- react-imask
- react-datepicker

To import Chakra UI and other components, you can use the following syntax:
```jsx
import { Box, Button, Text } from '@calvient/decal';
import { MdIcon } from '@calvient/decal';
import { useIMask } from '@calvient/decal';
```

# Using PuddleForm
PuddleForm is form library that works hand-in-glove with Puddleglum. Puddleglum is the automatically generated API client, based on the Laravel routes, controllers, and request objects. It has the benefit of running server-side validation and present errors on the front-end.

To use PuddleForm, you can use the following syntax:
```tsx
const form = usePuddleForm<TRequest, TReply>({
    initialValues: model,
    storeFunction: Puddleglum.Controllers.UserController.store,
    updateFunction: Puddleglum.Controllers.UserController.update,
});
```

`TRequest` is the type of the request object, and `TReply` is the type of the reply object. Normally, this might be a model from the backend or a form request, like `Puddleglum.Request.StoreUserRequest`.

## Example Usage
```tsx
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
```

Notes:
* If the request and reply match, you only have to specify `TRequest`.
* storeFunction and updateFunction are both optional. If you only want to create a form for creating a new model, you can omit the updateFunction -- and vice versa.