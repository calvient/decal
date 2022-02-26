import React from 'react';
import {Story} from '@storybook/react';
import {Button, ButtonProps} from './index';

export default {
	title: 'Button',
	component: Button,
};

const Template: Story<ButtonProps> = (props) => <Button {...props}>Test</Button>;

export const Basic = Template.bind({});
Basic.args = {
	children: 'Test',
};
