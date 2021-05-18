const Joi = require('joi');

module.exports = (schema) => (req, res, next) => {
    var result = validate(req.body, schema);
		if (result) return res.status(417).send(result);

		next();
}

const validate = (data, schema) => {
  var result = schema.validate(data);
  if (result.error == null) {
      return;
  } else {
      return {'validationError': result.error.details.map(x => x.message).join(', ')}
  }
}


