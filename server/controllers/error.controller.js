function handleError(req, res) {
  //Error handling functionality will be handled later.
}

function getErrorMessage(err) {
  return err.message;
}

module.exports = { getErrorMessage };
