export function isEmailValid(email: string) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return email.match(regex);
}

export function isPasswordValid(password: string) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{6,}$/;
  return password.match(regex);
}

export function isUsernameValid(username: string) {
  const regex = /^[A-Za-z0-9]{6,}$/;
  return username.match(regex);
}

export function isUserEighteenYearsAgo(date: string) {
  const givenDate = new Date(date);
  const currentDate = new Date();
  const eighteenYearsAgo = new Date(
    currentDate.getFullYear() - 18,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  return givenDate <= eighteenYearsAgo;
}
