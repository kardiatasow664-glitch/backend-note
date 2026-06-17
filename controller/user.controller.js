const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// la fonction d'inscription

exports.inscription = async (req , res) =>{


try {


const {prenom , nom , email , password} = req.body ;

// verifier si l'utilisateur existe

let user = await User.findOne({email})

// si il existe il te dira que le user a deja un compte avec error4000
if(user){
    return res.status(400).json({message:"utilisateur exsiste deja"})
}

//haser le password

const verifier = await bcrypt.genSalt(10);
const hashagePassword = await bcrypt.hash(password , verifier )

// creer l'utilisateur

user = await User.create({
    prenom ,
    nom,
    email,
    password:hashagePassword

})

  res.status(201).json({message : "inscription reussie"});
  console.log('inscription reussie');

}catch (error){
    res.status(500).json(error);
    console.log(error);
    


}

}

// fonction de connexion

exports.connexion = async (req , res ) => {
    try {
const {email , password } = req.body ;

// verificaton de l'email
const user = await User.findOne({email});
if(!user){
    return res.status(400).json({message : 'Utilisateur introuvable'})
}

// verification du password
const correspond = await bcrypt.compare(password , user.password);
if(!correspond){
     return res.status(400).json({message : 'Utilisateur mot de pass incorrect'})

}
// genere un token
const token = jwt.sign(
    { id: user._id},
    process.env.JWT_SECRET ,
    { expiresIn : "1d"}
);

res.json({
    token ,
    user :{
        id: user._id,
        prenom : user.prenom ,
        nom : user.nom ,
        email : user.email ,
    }

});
    } catch (error){
        res.status(500).json(error)
        console.log(error);
        
    }
}



