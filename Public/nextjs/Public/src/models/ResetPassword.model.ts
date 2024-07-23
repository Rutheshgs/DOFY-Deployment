export interface IResetPassword {
    UserName: string,
    PassWord: string,
    ConfirmPassword: string,
    IVKey: string,
    Salt: string
}