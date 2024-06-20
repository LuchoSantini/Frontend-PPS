import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  TextField,
  Button,
  Typography,
  Link,
  IconButton,
  InputAdornment,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { signup } from "../../../redux/store/authSlice";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import Spinner from "../../effects/Spinner";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Campo obligatorio"),
  surName: Yup.string().required("Campo obligatorio"),
  email: Yup.string()
    .email("Correo electrónico no válido")
    .required("Campo obligatorio"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(50, "La contraseña debe tener como máximo 50 caracteres")
    .matches(
      /(?=.*[A-Z])/,
      "La contraseña debe tener por lo menos una mayúscula"
    )
    .required("Por favor ingrese una contraseña"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
    .required("Por favor, confirma tu contraseña"),
});

const SignupForm = ({ toggleForm }) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      await dispatch(signup(values));
      //Aca hay que agregar el toasty de exito con el mensaje de mail enviado
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error al registrarse:", error);
      // Aca hay que agregar el toasty error
    }
  };

  return (
    <Formik
      initialValues={{ name: "", surName: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            position: "relative",
            width: "100%",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Registrarse
          </Typography>
          <Field
            name="name"
            as={TextField}
            label="Nombre"
            variant="outlined"
            style={{ marginBottom: "20px", width: "100%" }}
          />
          <ErrorMessage
            name="name"
            component="div"
            style={{ marginBottom: "10px", color: "red" }}
          />
          <Field
            name="surName"
            as={TextField}
            label="Apellido"
            variant="outlined"
            style={{ marginBottom: "20px", width: "100%" }}
          />
          <ErrorMessage
            name="surName"
            component="div"
            style={{ marginBottom: "10px", color: "red" }}
          />
          <Field
            name="email"
            as={TextField}
            label="Correo Electrónico"
            variant="outlined"
            style={{ marginBottom: "20px", width: "100%" }}
          />
          <ErrorMessage
            name="email"
            component="div"
            style={{ marginBottom: "10px", color: "red" }}
          />
          <Box sx={{ position: "relative", width: "100%" }}>
            <Field
              name="password"
              type={showPassword ? "text" : "password"}
              as={TextField}
              label="Contraseña"
              variant="outlined"
              style={{ marginBottom: "20px", width: "100%" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
            {passwordFocused && (
              <Box
                sx={{
                  position: "absolute",
                  top: "100%",
                  left: "0",
                  width: "100%",
                  marginTop: "8px",
                  zIndex: 1000,
                }}
              >
                <PasswordStrengthMeter password={values.password} />
              </Box>
            )}
          </Box>
          <ErrorMessage
            name="password"
            component="div"
            style={{ marginBottom: "10px", color: "red" }}
          />
          <Field
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            as={TextField}
            label="Confirmar Contraseña"
            variant="outlined"
            style={{ marginBottom: "20px", width: "100%" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <ErrorMessage
            name="confirmPassword"
            component="div"
            style={{ marginBottom: "10px", color: "red" }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ width: "100%" }}
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner /> : "Registrarse"}
          </Button>
          <Typography
            variant="body2"
            gutterBottom
            style={{ marginTop: "10px" }}
          >
            ¿Ya tienes una cuenta?{" "}
            <Link onClick={toggleForm}>Iniciar Sesión</Link>
          </Typography>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
