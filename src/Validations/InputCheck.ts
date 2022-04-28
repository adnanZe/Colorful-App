import * as yup from 'yup';

function getRgbSchema() {
  return yup
    .number()
    .typeError(` all colors are required`)
    .required(` all colors are required`)
    .moreThan(-1, 'Min nr. 0')
    .lessThan(256, 'Max nr. 255');
}

export const schema = yup.object({
  red: getRgbSchema(),
  green: getRgbSchema(),
  blue: getRgbSchema(),
});
