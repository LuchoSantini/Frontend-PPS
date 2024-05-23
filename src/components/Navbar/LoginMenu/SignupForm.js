import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Button, Typography, Link } from "@mui/material";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { signup } from "../../../redux/store/authSlice";

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

  const handleSubmit = (values) => {
    // Envía los valores del formulario al backend para registrarse
    dispatch(signup(values));
  };

  return (
    <Formik
      initialValues={{ name: "", surName: "", email: "", password: "" }}
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
          Registrarse
        </Button>
        <Typography variant="body2" gutterBottom style={{ marginTop: "10px" }}>
          ¿Ya tienes una cuenta?{" "}
          <Link onClick={toggleForm}>Iniciar Sesión</Link>
        </Typography>
      </Form>
    </Formik>
  );
};

export default SignupForm;
