import * as Yup from 'yup';

export const loginSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required(),
});

export const signupSchema = Yup.object({
    name : Yup.string().min(2).required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required(),
    termsAndCondition: Yup.boolean().required(),
});

export const TaskSchema = Yup.object({
    title : Yup.string().min(10).required(),
    description : Yup.string().optional(),
    deadline : Yup.date().optional(),
    assignedToId : Yup.number().optional()
  })

  import * as yup from 'yup';

  export const SprintSchema = yup.object({
    title: yup.string().required("Title is required"),
    description: yup.string(),
    startDate: yup.date(),
    endDate: yup.date(),
  });
  