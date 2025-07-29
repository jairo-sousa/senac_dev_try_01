const handleGetPromise = async (promise) => {
  try {
    const result = await promise;

    if (!result || (Array.isArray(result) && result.length === 0)) {
      return { data: { error: "Recurso não encontrado" }, statusCode: 404 };
    }

    return { data: result, statusCode: 200 };
  } catch (error) {
    return { data: { error: error.message }, statusCode: 500 };
  }
};

const handlePostPromise = async (promise) => {
  try {
    const result = await promise;
    return { data: result, statusCode: 201 };
  } catch (error) {
    return { data: { error: error.message }, statusCode: 400 };
  }
};

const handleNoContentPromise = async (promise) => {
  try {
    await promise;
    return { data: null, statusCode: 204 };
  } catch (error) {
    return { data: { error: error.message }, statusCode: 400 };
  }
};

module.exports = {
  handleGetPromise,
  handlePostPromise,
  handleNoContentPromise,
};
