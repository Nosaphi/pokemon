import { type_effectiveness } from "./type_effectiveness.js";

class Types {
    static all_types
    constructor(nom) {
        this.nom = nom;
        this.listeType = type_effectiveness.type_effectiveness[this.nom];
        fill_types()
    }

    toString(){
        efficacite = []

        // Trier les types par efficacité
        for(const type in this.listeType){
            const eff = this.listeType[type];
            if(!efficacite[eff]){
                efficacite[eff] = [];
            }
            efficacite[eff].push(type);
        }


        let res = this.nom + " : ";
        for(let effi in efficacite){
            res = res + effi + " = " + efficacite[effi];
        }
        return res;
    }

    fill_types(){
        type_effectiveness.type_effectiveness.forEach(type => {
            if(!all_types[type]){
                all_types.push(type);
            }
        });
    }
}

Types.prototype.fill_attacks();
console.table(Types.all_types);