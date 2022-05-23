import { CartItemType } from "../interfaces/CartItem";
import http from "./http-common";

class UserService {
  public prefix: string = 'users';
  payment(cardItems: CartItemType[]) {
    const token = localStorage.getItem("auth");
    return http.post(this.prefix + '/payment', { cardItems }, {
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}` ,
      }
    });
  }

}
export default new UserService();