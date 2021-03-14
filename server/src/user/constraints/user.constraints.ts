export enum UserConstraints{

    EMAIL_MAXLENGTH="Max supported length of email is 50",
    EMAIL_MAXVALUE=50,

    /* length is higher than 50 because we store password in encrypted form */
    PASSWORD_MAXLENGTH="Max supported length of password is 100",
    PASSWORD_MAXVALUE=100,

    FIRSTNAME_MAXLENGTH="Max supported length of firstname is 50",
    FIRSTNAME_MAXVALUE=50,

    LASTNAME_MAXLENGTH="Max supported length of lastname is 50",
    LASTNAME_MAXVALUE=50,

}