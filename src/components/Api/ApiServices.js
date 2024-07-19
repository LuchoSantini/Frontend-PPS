import api from "./Api";

export const Subscribe = (email) => {
  return api.put("/api/email/subscribe", email);
};

export const UnSubscribe = (email) => {
  return api.put("/api/email/unsubscribe", email);
};

// GET
export const allProducts = () => {
  return api.get("api/allproducts");
};
export const getProducts = () => {
  return api.get("api/products");
};

export const getProductByDescription = (description) => {
  return api.get(`api/products/${description}`);
};

export const getUsers = (token) => {
  return api.get("api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSizes = () => {
  return api.get("api/sizes");
};
export const getGenres = () => {
  return api.get("api/genres");
};
export const getColours = () => {
  return api.get("api/colours");
};
export const getCategories = () => {
  return api.get("api/categories");
};
export const getOrdersApproved = (token) => {
  return api.get("api/orders/user/approved", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//MAPPED VARIANTS FOR FILTER
export const getMSizes = () => {
  return api.get("api/mappedSizes");
};

export const getMColours = () => {
  return api.get("api/mappedColours");
};
export const getMCategories = () => {
  return api.get("api/mappedCategories");
};

// FILTER
export const getProductsByFilter = (query) => {
  return api.get(`/api/products?${query}`);
};

// POST
export const postProduct = (values, token) => {
  return api.post("/api/products", values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const postColours = (values, token) => {
  return api.post("/api/colours", values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const postSizes = (values, token) => {
  return api.post("/api/sizes", values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const postCategories = (values, token) => {
  return api.post("/api/categories", values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserByEmail = (email) => {
  return api.get("/api/user", { params: { email } });
};

export const postUser = (values) => {
  return api.post("/api/register", values);
};

export const postPayment = (cartItems, token) => {
  // Añade el parámetro token
  return api.post("/api/MercadoPago/payment", cartItems, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/api/authenticate", credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
