// store/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { loginUser, postUser } from "../../components/Api/ApiServices";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginUser(credentials);
      const { token } = response;
      Cookies.set("token", token);
      window.location.reload();
      return token;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  Cookies.remove("token");
  window.location.reload();
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: Cookies.get("token") || null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
      });
  },
});

export const signup = (userData) => async (dispatch) => {
  try {
    // Realiza la solicitud al backend para registrar al usuario
    const response = await postUser(userData);
    // Si la solicitud es exitosa, realiza el inicio de sesión del usuario con los datos devueltos por el backend
    //dispatch(login(response.data));
    window.location.reload();
  } catch (error) {
    // Maneja cualquier error que pueda ocurrir durante la solicitud
    console.error("Error al registrar usuario:", error);
    // Puedes agregar un manejo de errores más específico según tus necesidades
    // Por ejemplo, podrías dispatchear una acción para mostrar un mensaje de error al usuario
  }
};

export default authSlice.reducer;
