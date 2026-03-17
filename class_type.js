import { Type } from "./type.js";

class Types {
    static all_types
    constructor(nom, listeType) {
        this.nom = nom;
        this.listeType = listeType;
    }

    toString(){
        let res = this.nom + ": "
        for (var efficacite in this.listeType) {
            res = res + efficacite + " = " + this.listeType[efficacite] + ", ";
        }
        return res;
    }

    fill_types(){

    }
}