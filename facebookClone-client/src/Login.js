import React from "react";
import { TextField, makeStyles, Container, Typography, Button, Link, Box } from "@material-ui/core";
import clsx from "clsx";
import { AccountCircleRounded } from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { required, email, validateForm, length, format } from "redux-form-validators";
import { useDispatch } from "react-redux";
import { loginUser } from "./store/actions/auth";
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1)
  },
  container: {
    marginTop: "2rem"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  },
  icon: {
    fontSize: 32
  },
  button: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  box: {
    display: "flex",
    alignItems: "center"
  }
}));

const validate = validateForm({
  email: [required({ message: "This field is required" }), email({ message: "Invalid email" })],
  password: [
    required({ message: "This field is required" }),
    length({ min: 8, message: "Password must be at least 8 characters" }),
    format({ with: /^[a-z]+$/i, message: "Password can only be letters" })
  ]
});

const renderInputs = ({ input, meta: { touched, error }, name, label, ...custom }) => {
  // const label = name => name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <TextField
      error={touched && error}
      helperText={touched && error}
      variant='outlined'
      label={label}
      value={name}
      fullWidth
      margin='dense'
      {...input}
      {...custom}
    />
  );
};

function Login({ handleSubmit }) {
  const dispatch = useDispatch();
  const onSubmit = values => {
    console.log("values", values);
    console.log("yay!");
    dispatch(loginUser(values));
  };

  const classes = useStyles();
  return (
    <Container className={classes.container} maxWidth='sm'>
      <Typography variant='h2' gutterBottom>
        Login
      </Typography>
      <Box className={classes.box}>
        <AccountCircleRounded color='primary' className={classes.icon} />
        <Typography variant='body1'>Sign into your account</Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field component={renderInputs} name='email' label='Email' className={clsx(classes.dense)} />
        <Field
          component={renderInputs}
          type='password'
          name='password'
          label='Password'
          className={clsx(classes.dense)}
        />
        <Button type='submit' className={classes.button} variant='contained' color='primary'>
          Submit
        </Button>
        <Typography variant='body1'>
          Don't have an account?{" "}
          <Link color='primary' component={RouterLink} to='/register'>
            Sign Up
          </Link>
        </Typography>
      </form>
    </Container>
  );
}

export default reduxForm({ form: "login", validate })(Login);
