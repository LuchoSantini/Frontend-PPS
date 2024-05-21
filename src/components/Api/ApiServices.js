import api from "./Api";

// GET
export const allProducts = () => {
  return api.get("api/allproducts");
};
export const getProducts = () => {
  return api.get("api/products");
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
