export type ResponseDto<T> = {
  code: number,
  data: T,
  message: string,
}