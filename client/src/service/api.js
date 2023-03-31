import http from "./http";

class Products {
  getAll() {
    return http.get("/product/all");
  }

  get(productId) {
    return http.get(`/product/${productId}`);
  }

  create(data) {
    return http.post("/product/create", data);
  }

  update(productId, data) {
    return http.put(`/product/${productId}`, data);
  }

  delete(productId) {
    return http.delete(`/product/${productId}`);
  }

  deleteAll() {
    return http.delete(`/product`);
  }

  findByName(productName) {
    return http.get(`/product?title=${productName}`);
  }
}

export default new Products();