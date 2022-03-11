const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const User = require("../model/User");
const { check } = require("express-validator");
const { fieldsValidation } = require("../middleware/fields-validation");
const { isRoleValidate, emailExists, userExistsById } = require("../helpers/db-validators");

router.use(express.json())

router.route("/(:userId)?")
    .get(async (req, res) => {
        const { limit = 5, from = 0 } = req.query,
            filter = { state: true };

        const [total, users] = await Promise.all([
            User.countDocuments(filter),
            User.find(filter)
                .skip(+from).limit(+limit),
        ])
        //.catch(console.error);

        res.json({
            msg: "GET ahskljdhaskl",
            total,
            users
        })
    })
    .post([
        // check("role", "Role is not a valid role").isIn(["ADMIN_ROLE", "USER_ROLE"]),
        check("name", "The name is required").not().isEmpty(),
        check("passwd", "The password is required and more 3 characters").isLength({ min: 6 }),
        check("email", "Email is not valid").isEmail(),
        check("email").custom(emailExists),
        check("role").custom(isRoleValidate),
        fieldsValidation,
    ], async (req, res) => {
        const { name, email, passwd, role } = req.body;
        const user = new User({
            name, email, passwd, role
        });

        // //Verificar if the email exists
        // const exists = await User.findOne({ email })
        // if (exists) return res.status(400).json({
        //     err: "The email has already been registered"
        // })

        //Encriptar la passwd
        const salt = bcryptjs.genSaltSync();
        user.passwd = bcryptjs.hashSync(passwd, salt);

        await user.save();

        res.status(201).json({
            msg: "POST ahskljdaskl",
            user
        })
    })
    .put([
        check("userId", "El id no es valido").isMongoId(),
        check("userId").custom(userExistsById),
        check("role").custom(isRoleValidate),
        fieldsValidation
    ], async (req, res) => {
        const { userId } = req.params;
        const { _id, passwd, google, ...update } = req.body;
        // console.log(update)
        //Todo: Validar Id contra database
        if (passwd) {
            const salt = bcryptjs.genSaltSync();
            update.passwd = bcryptjs.hashSync(passwd, salt);
        }

        const user = await User.findByIdAndUpdate(userId, update)

        res.json({
            msg: "PUT ahskljdhaskl",
            user
        })
    })
    .patch((req, res) => {
        res.json({
            msg: "PATCH asdkljasñld",
        })
    })
    .delete([
        check("userId", "El id no es valido").isMongoId(),
        check("userId").custom(userExistsById),
        fieldsValidation
    ], async (req, res) => {
        const { userId } = req.params;
        //Borrarlo fisicamente
        //const user = await User.findByIdAndDelete(userId);
        const user = await User.findByIdAndUpdate(userId, { state: false })

        res.json({
            msg: "DELETE ahskljdhaskl",
            user
        })
    })

module.exports = router;