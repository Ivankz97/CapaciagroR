export class Uris {
    /**
     * Url base de la api, con tan solo cambiar esta url funcionara la api.
     */
    public static API_ENDPOINT = "http://registro.capaciagro.com/api/";
    public static API_FILES_ENDPOINT = "http://registro.capaciagro.com";

    public static API_LOGIN = `${Uris.API_ENDPOINT}login`;
    public static API_SIGN_UP = `${Uris.API_ENDPOINT}sign_up`;
    public static FORGOT_PASSWORD = `${Uris.API_ENDPOINT}forgot_password`

    // public static API_LOGOUT = `${Uris.API_ENDPOINT}/log_out`;

}