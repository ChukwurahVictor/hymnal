const Joi = require('@hapi/joi');

module.exports.hymnValidation = Joi.object({
   number: Joi.number().required(),
   title: Joi.string().required(),
   category: Joi.string().alphanum().required()
});

module.exports.hymnUpdateValidation = Joi.object({
   number: Joi.number(),
   title: Joi.string(),
   category: Joi.string().alphanum()
});

module.exports.chorusValidation = Joi.object({
   chorus: Joi.string().required(),
   hymn: Joi.string().alphanum().required()
});

module.exports.chorusUpdateValidation = Joi.object({
   chorus: Joi.string(),
   hymn: Joi.string().alphanum()
});

module.exports.categoryValidation = Joi.object({
   name: Joi.string().required()
});

module.exports.categoryUpdateValidation = Joi.object({
   name: Joi.string()
});

module.exports.verseValidation = Joi.object({
   verse: Joi.string().required(),
   hymn: Joi.string().alphanum().required()
});

module.exports.verseUpdateValidation = Joi.object({
   verse: Joi.string(),
   hymn: Joi.string().alphanum()
});

module.exports.userValidation = Joi.object({
   name: Joi.string().required(),
   email: Joi.string().email().required(),
   password: Joi.string().required(),
   admin: Joi.boolean()
});

module.exports.loginValidation = Joi.object({
   email: Joi.string().email().required(),
   password: Joi.string().required()
})