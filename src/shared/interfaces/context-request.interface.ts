export interface IContextRequest {
  body: unknown;
  method: string;
  originalUrl: string;
  params: unknown;
  query: unknown;
  user: unknown;
}
