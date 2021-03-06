export const jsonParse = (data) => {
  try {
    return JSON.parse(data);
  } catch (error) {
    logger.info({
      message: error.message,
      stack: error.stack,
      data,
    });

    throw new ValidationError("JSON parse error", [
      {
        path: ["body"],
        message: error.message,
      },
    ]);
  }
};
