const {connect} = require('mongoose');

//funcion anonima
(async () => {
    try {
        //const uri = "mongodb+srv://chapy:chapybass@24781279.evwbf.mongodb.net/reactivosDB?retryWrites=true&w=majority";
        const uri = "mongodb+srv://chapy:24781279@PROVIDA.12ub73d.mongodb.net/reactivosDB?retryWrites=true&w=majority&appName=DB-test"
        const db = await connect(uri)
        //const db = await connect("mongodb://127.0.0.1/reactivosDB")
        console.log('DB connected', db.connection.name)
    } catch (error) {
        console.error(error)
    }
})()
    
