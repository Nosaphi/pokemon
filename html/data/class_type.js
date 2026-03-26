import { typeEffectiveness } from "./type_effectiveness.js";

class Type {
    static all_types;

    constructor(nom) {
        this.nom = nom;
        this.listeType = typeEffectiveness[this.nom];
    }

    toString() {
        let efficacite = {};
        
        // Regrouper les types par efficacité
        for (const type in this.listeType) {
            const eff = this.listeType[type];
            if (!efficacite[eff]) {
                efficacite[eff] = [];
            }
            efficacite[eff].push(type);
        }

        // Trier les valeurs décroissantes
        const effiTriee = Object.keys(efficacite).map(Number).sort((a, b) => b - a);

        let res = this.nom + " : ";
        for (const effi of effiTriee) {
            res = res + effi + " = [" + efficacite[effi] + "], ";
        }

        return res.slice(0, -2); // Enlever la dernière virgule
    }   

    static fill_types() {
        Type.all_types = Object.keys(typeEffectiveness).map(nom => new Type(nom));
    }

    efficaciteContre(type){
        return this.listeType[type];
    }
}

export {Type}
