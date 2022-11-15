// 导入 Joi 来定义验证规则
const { ref } = require("joi");
const Joi = require("joi");

// 2. 定义验证规则
// 注意：如果客户端提交的某些参数项未在 schema 中定义，
// 此时，这些多余的参数项默认会被忽略掉
const userSchema = {
  // 2.1 校验 req.body 中的数据
  body: {
    username: Joi.string().alphanum().min(3).max(18).required(),
    password: Joi.string()
      .pattern(/^[\S]{6,12}$/)
      .required(),
  },
  // 2.2 校验 req.query 中的数据
  //   query: {
  //     name: Joi.string().alphanum().min(3).required(),
  //     age: Joi.number().integer().min(1).max(100).required()
  //   },
  // 2.3 校验 req.params 中的数据
  //   params: {
  //     id: Joi.number().integer().min(0).required()
  //   }
};

const infoSchema = {
  body: {
    id: Joi.number().integer().min(1).required(),
    nickname: Joi.string().min(3).max(18).required(),
    email: Joi.string().email().required(),
  },
};

const passwordSchema = {
  body: {
    oldPwd: Joi.string()
      .pattern(/^[\S]{6,12}$/)
      .required(),
    newPwd: Joi.string()
      .pattern(/^[\S]{6,12}$/)
      .not(ref("oldPwd"))
      .required(),
  },
};

const avatarSchema = {
  body: {
    avatar: Joi.string().dataUri().required(),
  },
};

module.exports = {
  userSchema,
  infoSchema,
  passwordSchema,
  avatarSchema,
};
