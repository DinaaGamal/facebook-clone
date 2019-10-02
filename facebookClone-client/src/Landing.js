import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import background from "./assets/imgs/showcase.jpg";
import { Button, Link } from "@material-ui/core";

import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100vh",
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    position: "relative"
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)"
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    color: "#ccc",
    "& h1": {
      fontWeight: "400"
    }
  },
  button: {
    margin: theme.spacing(1)
  },
  link: {
    "&:hover": {
      color: "inherit",
      textDecoration: "none"
    }
  }
}));

const Landing = () => {
  const classes = useStyles();
  return (
    <section className={classes.root}>
      <div className={classes.overlay}>
        <div className={classes.content}>
          <Typography color='inherit' variant='h1' gutterBottom>
            Devbook
          </Typography>
          <Typography variant='subtitle1' gutterBottom>
            Create a developer profile, share posts and get help from other developers
          </Typography>
          <div>
            <Button className={classes.button} variant='contained' color='primary'>
              <Link to='/register' component={RouterLink} color='inherit' className={classes.link}>
                Signup
              </Link>
            </Button>
            <Button className={classes.button} variant='contained' color='default'>
              <Link to='/login' component={RouterLink} color='inherit' className={classes.link}>
                login
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
