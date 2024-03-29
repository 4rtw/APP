const express       = require('express')
const mongoose      = require('mongoose')
const etudiant      = require('./Routes/EtudiantsRoutes')
const professeur    = require('./Routes/ProfessorsRoutes')
const MSG           = require('./Messages/messages')
const apiResponse   = require('./Models/apiResponse')
const variables     = require('./Database/variables')
const app           = express()
const port          = process.env.PORT || 3000
const prefix        = '/api'
mongoose.Promise = global.Promise
/*---------------------------------------------------------------------------------------*/
const uri = `mongodb+srv://${variables.user}:${variables.password}@${variables.clustername}/List?retryWrites=true&w=majority`;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
}

mongoose.connect(uri,options).then(
    ()=>{
        console.log("Connected to MongoDB")
    });
/*---------------------------------------------------------------------------------------*/

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization")
    next()
})

/*---------------------------------------------------------------------------------------*/

// Pour les formulaires
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(function (error, req, res, next) {
    if (error instanceof SyntaxError) {
        return res.status(400).json(apiResponse({
            data: [],
            status: 0,
            errors: [MSG.HTTP_400],
            message: ""
        }))
    } else {
        next();
    }
});

/*---------------------------------------------------------------------------------------*/

//api profs
app.route(prefix+'/professors')
    .get(professeur.getProfesseurs)

app.route(prefix +'/professor/:id')
    .get(professeur.getProfesseur)
    .put(professeur.updateProfesseur)
    .delete(professeur.deleteProfesseur)

app.route(prefix + '/professeur/search')
    .get(professeur.searchProfesseurs)

app.route(prefix +'/professor')
    .post(professeur.postProfesseur)


/*---------------------------------------*/

//api etudiant
app.route(prefix + '/etudiants')
    .get(etudiant.getEtudiants)

app.route(prefix + '/etudiants/search')
    .get(etudiant.searchEtudiants)

app.route(prefix +'/etudiant/:id')
    .get(etudiant.getEtudiant)
    .put(etudiant.updateEtudiant)
    .delete(etudiant.deleteEtudiant)

app.route(prefix +'/etudiant')
    .post(etudiant.postEtudiant)

/*---------------------------------------------------------------------------------------*/
app.listen(port, '0.0.0.0')
/*---------------------------------------------------------------------------------------*/

module.exports = app
