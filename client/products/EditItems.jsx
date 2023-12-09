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
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Link
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core';
import products from './api-products.js';
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

const EditItems = (props) => {
    const classes = useStyles();
    const [values, setValues] = useState({
        colourway: "",
        model: "",
        price: 0,
    });

    const handleChange = username => event => {
        setValues({ ...values, [username]: event.target.value })
    }

    //Complete
    const clickSubmit = () => {
        const updatedSneaker = {
            colourway: values.colourway || undefined,
            model: values.model || undefined,
            price: values.price || undefined,
        }

        products.update(updatedSneaker).then((data) => {
            if (data.message == "Your sneaker has been updated successful!") {
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
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h5" className={classes.title}>
                    Update Sneaker Price
                </Typography>
                <TextField id="colourway" label="Colourway" value={values.colourway} onChange={handleChange('colourway')} margin="normal" className={classes.textField} /><br />
                <TextField id="model" label="Model" value={values.model} onChange={handleChange('model')} margin="normal" className={classes.textField} /><br />
                <TextField id="price" label="Price" value={values.price} onChange={handleChange('price')} margin="normal" className={classes.textField} /><br />
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
                <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit} >Update Sneaker</Button>
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
                <DialogTitle>Updated Sneaker</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Your sneaker has been updated.
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

export default EditItems;