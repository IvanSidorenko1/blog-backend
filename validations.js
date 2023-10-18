import { body } from "express-validator";

export const loginValidation = [
  body("email", "Не вірний формат пошти").isEmail(),
  body("password", "Пароль повинен бути білше ніж 5 сиволів").isLength({
    min: 5,
  }),
];

export const registerValidation = [
  body("email", "Не вірний формат пошти").isEmail(),
  body("password", "Пароль повинен бути білше ніж 5 сиволів").isLength({
    min: 5,
  }),
  body("fullName", "Вкажіть ім'я").isLength({ min: 3 }),
  body("avatarUrl", "Не вірне вказане посилання").optional().isURL(),
];

export const postCreateValidation = [
  body("title", "Введіть текст заголовка").isLength({ min: 3 }).isString(),
  body("text", "Введіть текст").isLength({ min: 10 }).isString(),
  body("tags", "Не вірне формат тегів (використовуйтк масив)")
    .optional()
    .isString(),
  body("imageUrl", "Не вірне посилання на зображення").optional().isString(),
];
