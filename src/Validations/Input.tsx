import { useCallback } from 'react';
import * as yup from 'yup';

export interface FormRGBInputs {
  red: string | undefined;
  green: string | undefined;
  blue: string | undefined;
}

export const useYupValidationResolver = (validationSchema: any) =>
  useCallback(
    async (data: any) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors: any) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors: any, currentError: any) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );

export const schema: any = yup.object({
  red: yup
    .string()
    .required('Please add number for red')
    .min(0, 'Add range between 0 - 255')
    .max(255, 'Add range between 0 - 255'),
  green: yup
    .string()
    .required('Please add number for green')
    .min(0, 'Add range between 0 - 255')
    .max(255, 'Add range between 0 - 255'),
  blue: yup
    .string()
    .required('Please add number for blue')
    .min(0, 'Add range between 0 - 255')
    .max(255, 'Add range between 0 - 255'),
});
