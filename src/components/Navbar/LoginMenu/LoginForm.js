import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  TextField,
  Button,
  Typography,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/store/authSlice";
import Spinner from "../../hooks/Effects/Spinner";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Correo electrónico no válido")
    .required("Campo obligatorio"),
  password: Yup.string().required("Campo obligatorio"),
});

const LoginForm = ({ toggleForm }) => {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values) => {
    try {
      setIsSubmitting(true); // Marcamos como enviando
      await dispatch(login(values)); // Enviar los valores del formulario al método de inicio de sesión de Redux
      setIsSubmitting(false); // Marcamos como no enviando después del éxito
    } catch (error) {
      setIsSubmitting(false); // Aseguramos que siempre se resetee el estado en caso de error
      console.error("Error al iniciar sesión:", error);
      // Aquí podrías manejar errores de inicio de sesión si es necesario
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Iniciar Sesión
        </Typography>
        <Field
          name="email"
          type="email"
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
        />
        <ErrorMessage
          name="password"
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
          {isSubmitting ? <Spinner /> : "Iniciar Sesión"}
        </Button>
        <Typography variant="body2" gutterBottom style={{ marginTop: "10px" }}>
          ¿No tienes una cuenta? <Link onClick={toggleForm}>Registrarse</Link>
        </Typography>
      </Form>
    </Formik>
  );
};

export default LoginForm;
