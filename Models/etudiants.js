let mongoose = require('mongoose')
let aggregatePaginate = require("mongoose-aggregate-paginate-v2")
let Schema =mongoose.Schema

let etudiantsSchema = Schema({
    id: {
        type: Number,
        required: [true, "Champ requis"],
        unique: true,
        min: 0
    },
    matricule:{
        type: Number,
        required: [true, "Champ requis"],
        unique: true
    },
    nom: {
        type: String,
        required: [true, "Champ requis"]
    },
    prenom:{
        type: String,
        required: [true, "Champ requis"]
    },
    contacts:{
        type: [String],
        required: [true, "Champ requis"]
    }
})

etudiantsSchema.plugin(aggregatePaginate)

module.exports = mongoose.model('Etudiants', etudiantsSchema);
