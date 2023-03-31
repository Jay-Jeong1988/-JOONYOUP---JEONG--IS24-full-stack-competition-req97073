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

  findByName(productName) {
    return http.get(`/product?title=${productName}`);
  }
}

export default new Products();