import React from 'react';

interface InputButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Button = (props: InputButtonProps) => (
    <input style={{ margin: '0 .25rem' }} type='button' {...props} />
);

export default Button;
