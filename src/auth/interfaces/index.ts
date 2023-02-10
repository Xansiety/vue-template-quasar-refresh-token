export interface Usuario {
    usuario?: string,
    rol?: string,
    accessToken?: string
}

export interface Credentials {
    usuario: string;
    password: string;
  } 

  export enum AuthorizeStatus {
    authorize = "authorize" ,
    unauthorize = "unauthorize"
}
 

 