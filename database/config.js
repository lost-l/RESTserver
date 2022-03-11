const mongoose = require("mongoose");

const DbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true, 
            // useFindAndModify: false,
        })
        // console.log("Conecction successfully");
    } catch (error) {
        // console.log(error)
        throw new Error("Error al realizar la conexión a la db");
    }
};

module.exports = { DbConnection }