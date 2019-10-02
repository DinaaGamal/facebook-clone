import React from "react";
import { Link as RouterLink } from "react-router-dom";
// material ui
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CodeIcon from "@material-ui/icons/Code";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link, Typography } from "@material-ui/core";

function ListItemLink(props) {
  return <ListItem button component={RouterLink} {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    cursor: "pointer"
  },
  icon: {
    margin: theme.spacing(1),
    fontSize: 32
  },
  link: {
    "&:hover": {
      color: "inherit",
      textDecoration: "none"
    }
  }
}));

const Navbar = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position='static' color='primary'>
        <Toolbar>
          <CodeIcon className={classes.icon} />
          <Typography variant='h6' className={classes.title}>
            <Link component={RouterLink} to='/' color='inherit' underline='none' className={classes.link}>
              Devbook
            </Link>
          </Typography>
          <List component='nav' dense={true}>
            <ListItem component='div'>
              <ListItemLink>
                <Link
                  component={RouterLink}
                  to='/developers'
                  color='inherit'
                  underline='none'
                  className={classes.link}>
                  <ListItemText primary='Developers' />
                </Link>
              </ListItemLink>
              <ListItemLink>
                <Link
                  component={RouterLink}
                  to='/register'
                  color='inherit'
                  underline='none'
                  className={classes.link}>
                  <ListItemText primary='Register' />
                </Link>
              </ListItemLink>
              <ListItemLink>
                <Link
                  component={RouterLink}
                  to='/login'
                  color='inherit'
                  underline='none'
                  className={classes.link}>
                  <ListItemText primary='Login' />
                </Link>
              </ListItemLink>
            </ListItem>
          </List>
          {/* <Button color="inherit">Developers</Button> */}
          {/* <Button color="inherit">Register</Button>
            <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
