import React from "react";
import { TextField, makeStyles, Container, Typography, Button, Link, Box } from "@material-ui/core";
import clsx from "clsx";
import { AccountCircleRounded } from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { reduxForm, Field, FormSection } from "redux-form";
import { required, email, validateForm, length, format, confirmation } from "redux-form-validators";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "./store/actions/auth";
// styles
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
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  box: {
    display: "flex",
    alignItems: "center"
  }
}));

// form validation
const validate = validateForm({
  name: [
    required({ message: "This field is required" }),
    length({ max: 30, message: "Maximum characters exceeded" })
  ],
  email: [required({ message: "This field is required" }), email({ message: "Invalid email" })],
  section: {
    password: [
      required({ message: "This field is required" }),
      length({ min: 8, message: "Password must be at least 8 characters" }),
      format({ with: /^[0-9a-z]+$/i, message: "Password can only be letters" })
    ]
    // confPassword: [confirmation({ field: "section.password", fieldLabel: "Password" })]
  }
});

// input components
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

// form component
function Register(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  console.log(user);
  console.log("props", props);
  const { handleSubmit } = props;

  const onSubmit = values => {
    console.log("formValues", values);
    console.log("Yay we did it");
    dispatch(signUpUser(values));
  };

  // const onReset = () => {
  //   props.destroy();
  //   props.initialize("");
  // };

  const classes = useStyles();
  return (
    <Container className={classes.container} maxWidth='sm'>
      <Typography variant='h2' gutterBottom>
        Sign Up
      </Typography>
      <Box className={classes.box}>
        <AccountCircleRounded color='primary' className={classes.icon} />
        <Typography variant='body1'>Create Your Account</Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field component={renderInputs} name='name' label='Name' className={clsx(classes.dense)} />
        <Field component={renderInputs} name='email' label='Email' className={clsx(classes.dense)} />
        <FormSection name='section'>
          <Field
            component={renderInputs}
            type='password'
            name='password'
            label='Password'
            className={clsx(classes.dense)}
          />
          <Field
            validate={confirmation({ field: "section.password", fieldLabel: "Password" })}
            component={renderInputs}
            type='password'
            name='confPassword'
            label='Confirm Password'
            className={clsx(classes.dense)}
          />
        </FormSection>

        {/* <Typography>
          
        </Typography> */}

        <Button type='submit' className={classes.button} variant='contained' color='primary'>
          Submit
        </Button>
        {/* <Button onClick={onReset} className={classes.button} variant='contained' color='default'>
          Reset
        </Button> */}
        <Typography variant='body1'>
          Already have an account?{" "}
          <Link color='primary' component={RouterLink} to='/login'>
            Login
          </Link>
        </Typography>
      </form>
    </Container>
  );
}

export default reduxForm({ form: "register", validate })(Register);
