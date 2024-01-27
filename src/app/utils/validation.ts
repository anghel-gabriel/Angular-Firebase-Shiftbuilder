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

export function isUserAgeBetweenEighteenAndNinety(date: any) {
  const givenDate = new Date(date);
  const currentDate = new Date();

  const eighteenYearsAgo = new Date(
    currentDate.getFullYear() - 6,
    currentDate.getMonth(),
    currentDate.getDate()
  );

  const ninetyYearsAgo = new Date(
    currentDate.getFullYear() - 130,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  return givenDate <= eighteenYearsAgo && givenDate >= ninetyYearsAgo;
}

export function isDateBefore(firstDate: Date, secondDate: Date) {
  return firstDate < secondDate;
}
