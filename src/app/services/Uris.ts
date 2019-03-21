export class Uris {
    /**
     * Url base de la api, con tan solo cambiar esta url funcionara la api.
     */
    public static API_ENDPOINT = "http://68.183.18.239/api/";
    //public static API_FILES_ENDPOINT = "http://registro.capaciagro.com";
    public static API_FILES_ENDPOINT = "http://68.183.18.239.com";

    public static API_LOGIN = `${Uris.API_ENDPOINT}login`;
    public static API_SIGN_UP = `${Uris.API_ENDPOINT}sign_up`;
    public static FORGOT_PASSWORD = `${Uris.API_ENDPOINT}forgot_password`;
    public static API_CREATE_USER = `${Uris.API_ENDPOINT}create_user`;
    public static API_CREATE_COUPON = `${Uris.API_ENDPOINT}create_coupon`;
    

    // public static API_LOGOUT = `${Uris.API_ENDPOINT}/log_out`;

}