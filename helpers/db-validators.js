const Role = require("../model/Role");
const User = require("../model/User");

const isRoleValidate = async (role = "") => {
    const exists = await Role.findOne({ role });
    if (!exists) throw new Error(`The role ${role} is not register in the  DB`)
}

const emailExists = async (email) => {
    //Verificar if the email exists
    const exists = await User.findOne({ email })
    if (exists) throw new Error("The email has already been registered");
}

const userExistsById = async (id) => {
    const userExists = await User.findById(id);
    if (!userExists) throw new Error(`id: ${id ?? ""}, The user does not exists`);
}

module.exports = { isRoleValidate, emailExists, userExistsById }