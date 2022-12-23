import React from 'react';

interface InputButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const styling = { margin: '0 .25rem' };

/**
 * Shared Button component with minimum styles applied
 */
const Button = (props: InputButtonProps) => <input style={styling} type='button' {...props} />;

export default Button;
