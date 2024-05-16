import api from "./Api";
export const allProducts = () => {return api.get("api/allproducts")};
export const getProducts = () => {return api.get("api/products")};
export const getUsers = () => {return api.get("api/users")};
export const getSizes = () => {return api.get("api/sizes")};
export const getColours = () => {return api.get("api/colours")};
export const getCategories = () => {return api.get("api/categories")};

export const postProduct = (values) => {return api.post("api/products", values)};
// agregar los que faltan