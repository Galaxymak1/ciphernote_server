export namespace AuthModel {
    export type signInResponse=  {
        accessToken: string;
        email: string;
    }

    export type registerBody = {
        email: string;
        password: string;
    }

    export type signUpBody = {
        email: string;
        password: string;
    }
}