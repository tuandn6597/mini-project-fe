import http from "./http-common";

class ProductService {
  public prefix: string = 'products'
  getAll() {
    return http.get(this.prefix);
  }
  
}
export default new ProductService();