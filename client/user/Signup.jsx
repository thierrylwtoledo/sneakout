import {
  Card,
  CardContent,
  Typography,
  TextField,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import UserCtrl from "./api-user";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 400,
    margin: "0 auto",
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    textAlign: "center",
  },
  textField: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  error: {
    color: "red",
  },
  submit: {
    margin: "0 auto",
    marginBottom: theme.spacing(2),
  },
  title: {
    fontSize: 18,
  },
}));

export default function Signup() {
  const classes = useStyles();

  const [values, setValues] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (username) => (event) => {
    setValues({ ...values, [username]: event.target.value });
  };

  const clickSubmit = () => {
    const user = {
      username: values.username || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };

    console.log("user data submitted from the form");

    console.log(user);
    UserCtrl.create(user).then((data) => {
      console.log(data.message);
      if (data.message == "Successfully created!") {
        setOpen(true);
      } else {
        setError(true);
        setErrorMessage(data.message);
      }
    });
  };

  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleSuccessClose() {
    setOpen(false);
  }
  function handleErrorClose() {
    setError(false);
  }

  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Sign Up
          </Typography>

          <TextField
            id="username"
            label="Username"
            className={classes.textField}
            value={values.username}
            onChange={handleChange("username")}
            margin="normal"
          />
          <TextField
            id="email"
            label="Email"
            className={classes.textField}
            value={values.email}
            onChange={handleChange("email")}
            margin="normal"
          />
          <TextField
            id="password"
            label="Password"
            className={classes.textField}
            value={values.password}
            onChange={handleChange("password")}
            type="password"
            margin="normal"
          />
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={clickSubmit}
            className={classes.submit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>

      <Dialog open={error}>
        <DialogTitle>Error!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            There has been an error: {errorMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            autoFocus
            variant="contained"
            onClick={handleErrorClose}
          >
            Exit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open}>
        <DialogTitle>Signed-up!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are signed up!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <DialogActions>
          <Link to="/signin">
            <Button color="primary" autoFocus="autoFocus" variant="contained">
              Sign In
            </Button>
          </Link>
        </DialogActions>
        </DialogActions>
      </Dialog>
    </>
  );
}
