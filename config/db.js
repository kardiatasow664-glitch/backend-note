const mongoose = require('mongoose');


// creation de la fonction qui gere la conexion avec la db

const connectDB = async () =>{
    
    try{
        // attendre la base de donne
        await mongoose.connect(process.env.URL_MONGO);
        console.log('MongoDB connecté');

    } catch (error){
        // recuperer les erreurs
        console.log('Erreur mongoDB');
        console.log('Erreur mongoDB' , error);

        // process.exit(0) ->le programme s'est terminé normalement (succés).
        // process.exit(1) ->le programme s'est terminé à cause d'un erreur.
        process.exit(1)


    }
}
// export default connectDB 
module.exports = connectDB