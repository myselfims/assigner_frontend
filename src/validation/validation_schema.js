import * as Yup from 'yup';

export const loginSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required(),
});

export const signupSchema = Yup.object({
    name : Yup.string().min(2).required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required(),
});

export const TaskSchema = Yup.object({
    title : Yup.string().min(10).required(),
    description : Yup.string(),
    deadline : Yup.date().required(),
    assignedToId : Yup.number().required()
  })