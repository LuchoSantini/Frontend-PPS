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
  password: Yup.string().required("Campo obligatorio"),
});

const SignupForm = ({ toggleForm }) => {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values) => {
    try {
      setIsSubmitting(true); // Marcamos como enviando
      await dispatch(signup(values)); // Enviar los valores del formulario al método de inicio de sesión de Redux
      setIsSubmitting(false); // Marcamos como no enviando después del éxito
    } catch (error) {
      setIsSubmitting(false); // Aseguramos que siempre se resetee el estado en caso de error
      console.error("Error al registrarse:", error);
      // Aquí podrías manejar errores de inicio de sesión si es necesario
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
          <PasswordStrengthMeter password={values.password} />
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
