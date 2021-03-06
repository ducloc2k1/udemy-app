import { Avatar, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../../components/form-controls/InputField';
import PasswordField from '../../../../components/form-controls/PasswordField';

RegisterForm.propTypes = {};

function RegisterForm(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(2),
    },
    avatar: {
      margin: theme.spacing(1, 'auto'),
      backgroundColor: theme.palette.secondary.main,
    },

    title: {
      textAlign: 'center',
      marginTop: theme.spacing(2),
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    button: {
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();

  async function handleSubmit(values) {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  }

  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Please enter this field.')
      .test(
        'Should has at leaste two word',
        'Please enter at least two words',
        (value) => value.split(' ').length >= 2
      ),
    email: yup.string().required('Please enter this field.').email('Email is invalid'),
    password: yup.string().required('Please enter this field').min(2, 'Password at least 8 characters'),
    retypePassword: yup
      .string()
      .required('Please enter this field')
      .oneOf([yup.ref('password')], 'password does not match'),
  });

  const registerForm = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      retypePassword: '',
    },
    resolver: yupResolver(schema),
  });

  const { isSubmitting } = registerForm.formState;

  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress />}
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography className={classes.title} component='h1' variant='h5'>
        Sign up
      </Typography>
      <form className='' onSubmit={registerForm.handleSubmit(handleSubmit)}>
        <InputField name='fullName' form={registerForm} label='Full name' disabled={false} />
        <InputField name='email' form={registerForm} label='Email' disabled={false} />
        <PasswordField name='password' form={registerForm} label='Password' disabled={false} />
        <PasswordField name='retypePassword' form={registerForm} label='Retype Password' disabled={false} />
        <Button
          disable={isSubmitting.toString()}
          type='submit'
          className={classes.button}
          variant='contained'
          color='primary'
          fullWidth
          margin='normal'
        >
          CREATE AN ACCOUNT
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
