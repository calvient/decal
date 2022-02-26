import React, {FC} from 'react';
import {Button as NbButton, IButtonProps as NbButtonProps} from 'native-base';

export interface ButtonProps extends NbButtonProps {}

export const Button: FC<ButtonProps> = ({...nbProps}) => <NbButton {...nbProps} />;

export default Button;
