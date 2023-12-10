const validateBeforeCreate = async (schema, data) => {
  return await schema.validateAsync(data, {
    abortEarly: false,
  });
};

const INVALID_UPDATE_FIELDS = ["_id", "createdAt"];

export const modelValidate = {
  validateBeforeCreate,
  INVALID_UPDATE_FIELDS,
};
