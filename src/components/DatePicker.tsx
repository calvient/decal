import {FC} from 'react';
import {forwardRef, Input, InputGroup, InputLeftAddon} from '@chakra-ui/react';
import ReactDatePicker, {ReactDatePickerProps} from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import '../theme/date-picker.css';

const DatePicker: FC<
  ReactDatePickerProps & {label?: string; size?: string; labelWidth?: string}
> = ({label, size = 'md', labelWidth, ...props}) => {
  const DateInput = forwardRef(({value, onClick, onChange}, ref) => (
    <InputGroup size={size}>
      {label && <InputLeftAddon w={labelWidth}>{label}</InputLeftAddon>}
      <Input
        bgColor='white'
        ref={ref}
        placeholder={label ?? ''}
        value={value}
        onClick={onClick}
        onChange={onChange}
      />
    </InputGroup>
  ));

  return (
    <div className='light-theme'>
      <ReactDatePicker {...props} showPopperArrow={false} customInput={<DateInput />} />
    </div>
  );
};

export default DatePicker;
