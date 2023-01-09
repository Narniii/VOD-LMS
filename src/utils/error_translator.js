export function TranslateError(err) {
    err = err.replace('Error', 'خطا');
    err = err.replace('password missing', 'رمز عبور نمیتواند خالی باشد!');
    err = err.replace('username/phoneNumber/email missing', 'نام کاربری، شماره همراه یا ایمیل خود را وارد کنید!');
    err = err.replace('user not found', 'نام کاربری مورد نطر یافت نشد!');
    err = err.replace('wrong password', 'رمز عبور اشتباه است!');
    err = err.replace('wrong code', 'کد اشتباه است!');
    err = err.replace('a user with this phoneNumber exsists', 'کاربری با این شماره یا ایمیل وجود دارد!');
    err = err.replace('No Comments for this book yet', 'هنوز نظری ثبت نشده است!');
    return err;
}