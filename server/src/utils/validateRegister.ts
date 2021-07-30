import { validateEmail } from "./vailidateEmail";

export const validateRegister = (inputs: any) => {
  if (!validateEmail(inputs.email)) {
    return [
      {
        field: "email",
        message: "invalid email",
      },
    ];
  }

  if (inputs.firstName.length < 3 || inputs.firstName.length > 24) {
    return [
      {
        field: "firstName",
        message: "name too long or short",
      },
    ];
  }

  if (inputs.lastName.length < 3 || inputs.lastName.length > 24) {
    return [
      {
        field: "lastName",
        message: "name too long or short",
      },
    ];
  }

  if (inputs.password.length < 3 || inputs.password.length > 24) {
    return [
      {
        field: "password",
        message: "password too long or short",
      },
    ];
  }

  return "";
};
