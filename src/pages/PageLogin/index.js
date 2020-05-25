import React, { useContext, useState } from 'react';
import useInputState from 'utils/hooks/useInputState';
import { Redirect } from "react-router-dom";
import { AppContext } from 'context/AppContext';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, CssBaseline, TextField, Link, Paper, Box, Grid, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { postLogin } from 'api';
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            <Link color="inherit" href="https://github.com/steven-jackson-dev/" target="_blank">Steven Jackson</Link>
            {' '}{new Date().getFullYear()}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function PageLogin() {
    const [state, dispatch] = useContext(AppContext);
    const classes = useStyles();
    const [showMessage, setShowMessage] = useState(false);
    const [inputEmail, setInputEmail] = useInputState(false);
    const [inputPassword, setInputPassword] = useInputState(false);

    const handleLogin = async () => {
        const login = await postLogin(inputEmail, inputPassword);
        console.log("handleLogin -> login", login)

        if (login.status === 'failed') setShowMessage(login)
        if (login.jwt) {
            localStorage.setItem("token", JSON.stringify(login.jwt));
            dispatch({ type: 'SET_JWT_TOKEN', payload: login.jwt })
        }
    }

    if (state.isAuthenticated) return <Redirect to="/" />;

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">Sign in</Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={setInputEmail}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={setInputPassword}
                        autoComplete="current-password"
                    />
                    {showMessage &&
                        <div style={{ fontSize: '1em', color: showMessage.status === 'failed' ? 'red' : 'green' }}>{showMessage.message}</div>
                    }
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleLogin}
                    >

                        Sign In
            </Button>

                    <Box mt={5}>

                        <Copyright />
                    </Box>
                </div>
            </Grid>
        </Grid>
    );
}

export default PageLogin;