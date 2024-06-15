import api from "./Api";

// GET
export const allProducts = () => {
  return api.get("api/allproducts");
};
export const getProducts = () => {
  return api.get("api/products");
};

export const getProductById = (id) => {
  return api.get(`api/products/${id}`);
};

export const getUsers = () => {
  return api.get("api/users");
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
export const postProduct = (values) => {
  return api.post("/api/products", values);
};
export const postColours = (values) => {
  return api.post("/api/colours", values);
};
export const postSizes = (values) => {
  return api.post("/api/sizes", values);
};
export const postCategories = (values) => {
  return api.post("/api/categories", values);
};

export const postUser = (values) => {
  return api.post("/api/register", values);
};

export const postPayment = (values) => {
  return api.post("/api/PaymentControllerMP/create-preference", values);
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/api/authenticate", credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
