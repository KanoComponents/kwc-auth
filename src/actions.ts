// Sample set of actions for authentication. These are the necessary actions in order to make the Auth flow functional in your app.
export interface IForm {
    email: string;
    username: string;
    password: string;
}
export interface ILoginForm {
    username: string;
    password: string;
}

export interface IActions {
    login(f : ILoginForm) : Promise<void>;
    register(f : IForm) : Promise<void>;
    getAuthenticatedUser(u : string) : Promise<{id: string}>;
    checkUsernameAvailability(u : string) : Promise<void>;
    forgotPassword(u : string) : Promise<void>;
    forgotUsername(e : string) : Promise<void>;
    forgotEmail(e : string) : Promise<void>;
    resendEmail(uid : string) : Promise<void>;
}
