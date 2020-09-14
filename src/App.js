import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";

function ipv4(message = 'Invalid IP address') {
  return this.matches(/(^(\d{1,3}\.){3}(\d{1,3})$)/, {
    message,
    excludeEmptyString: true
  }).test('ip', message, value => {
    return value === undefined || value.trim() === ''
      ? true
      : value.split('.').find(i => parseInt(i, 10) > 255) === undefined;
  });
}

yup.addMethod(yup.string, 'ipv4', ipv4);

const schema = yup.object().shape({
  testIpv4: yup.string().ipv4().required(),
});

const App = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit((values) => console.log(values))}>
      <TextField inputRef={register} helperText={errors.testIpv4?.message} error={!!errors.testIpv4} inputProps={{name: 'testIpv4'}} label='IPV4 Validation' />
      <Button type='submit'>Submit</Button>
    </form>
  )
}
export default App;
