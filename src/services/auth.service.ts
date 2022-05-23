import http from "./http-common";
export type RegisterDto = {
  username: string,
  email: string,
  password: string,
}
export type LoginDto = {
  email: string,
  password: string,
}
class AuthService {
  public prefix: string = 'auth'
  register(dto: RegisterDto) {
    return http.post(this.prefix + '/register', dto);
  }
  login(dto: LoginDto) {
    return http.post(this.prefix + '/login', dto);
  }
}
export default new AuthService();