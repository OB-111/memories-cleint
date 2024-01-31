import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Typography,
  Container,
  Grid,
} from "@material-ui/core";
import useStayles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { GoogleLogin } from "@react-oauth/google";
import { AUTH } from "../../constants/actionTypes";

import { useNavigate } from "react-router-dom";

import Input from "./Input/Input";
import Icon from "./icon";
import { signin, signup } from "../../actions/auth";

import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const classes = useStayles();
  const [formData, setFormData] = useState(initialState);

  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handelShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const googleError = (error) => {
    console.log(error);
    console.log("Google Sign In was Unsuccessful . Try Again Later");
  };

  const googleSuccess = async (res) => {
    const token = res?.credential;
    const result = jwtDecode(token);
    try {
      dispatch({ type: AUTH, data: { result, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handelSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handelChange={handelChange}
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handelChange={handelChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handelChange={handelChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handelChange={handelChange}
              type={showPassword ? "text" : "password"}
              handelShowPassword={handelShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handelChange={handelChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="149341206726-a69n5v9752n106qqb7fsdqm0l55iohoj.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />

          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account ? Sign In"
                  : "Dont have an account ? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
export default Auth;
