import React from 'react';
import { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    Typography,
    TextField,
    CardActions,
    Icon,
    Button,
    Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions,Link
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core';
import UserCtrl from './api-user.js';
import { Redirect } from 'react-router-dom';

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

const UpdateUser = (props) => {
    const classes = useStyles();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = username => event => {
        setValues({ ...values, [username]: event.target.value })
    }

    //Complete
    const clickSubmit = () => {
        const user = {
            username: values.username || undefined,
            email: values.email || undefined,
            password: values.password || undefined,
          };

        UserCtrl.update(user).then((data) => {
            if (data.message == "Update successful!") {
                setValues({ ...values, error: '', redirectToReferrer: true });
                setOpen(true);
            } else {
                setError(true);
                setErrorMessage(data.message);
            }
        })
    }

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
        <Card className={classes.card} >
            <CardContent>
                <Typography variant="h5" className={classes.title} >
                    Edit User
                </Typography>
                <TextField id="username" label="Username" value={values.username} onChange={handleChange('username')} margin="normal" className={classes.textField} /><br />

                <TextField id="email" label="Email" value={values.email} onChange={handleChange('email')} margin="normal" className={classes.textField} /><br />
                
                <TextField id="password" label="Password" value={values.password} onChange={handleChange('password')} margin="normal" className={classes.textField} /><br />
                <br />
                
                {
                    values.error &&
                    (
                        <Typography component="p" color="error">
                            <Icon color="error" className={classes.error}>error</Icon>
                            {values.error}
                        </Typography>
                    )
                }
            </CardContent>
            <CardActions>
                <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit} >Update User</Button>
            </CardActions>


            <Dialog open={error}>
                <DialogTitle>Error!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        There has been an error: {errorMessage}.
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
                <DialogTitle>Updated User</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        A user has been updated!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                        <Button
                            color="primary"
                            autoFocus
                            variant="contained"
                            onClick={handleSuccessClose}
                            >
                            Exit
                        </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
};

export default UpdateUser;