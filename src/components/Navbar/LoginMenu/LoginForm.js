import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Button, Typography, Link } from "@mui/material";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/store/authSlice";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Correo electrónico no válido")
    .required("Campo obligatorio"),
  password: Yup.string().required("Campo obligatorio"),
});

const LoginForm = ({ toggleForm }) => {
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(login(values)); // Enviar los valores del formulario al método de inicio de sesión de Redux
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
          type="password"
          as={TextField}
          label="Contraseña"
          variant="outlined"
          style={{ marginBottom: "20px", width: "100%" }}
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
        >
          Iniciar Sesión
        </Button>
        <Typography variant="body2" gutterBottom style={{ marginTop: "10px" }}>
          ¿No tienes una cuenta? <Link onClick={toggleForm}>Registrarse</Link>
        </Typography>
      </Form>
    </Formik>
  );
};

export default LoginForm;
