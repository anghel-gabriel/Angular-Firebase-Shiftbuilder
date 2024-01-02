export const isEmailValid = (email: string) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(email);
};

function isPasswordValid(password: string) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/;
  return regex.test(password);
}

function isUsernameValid(username: string) {
  const regex = /^[A-Za-z0-9]+$/;
  return regex.test(username);
}
