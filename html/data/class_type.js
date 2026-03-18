import { typeEffectiveness } from "./type_effectiveness.js";

class Types {
    static all_types
    constructor(nom) {
        this.nom = nom;
        this.listeType = typeEffectiveness[this.nom];
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
        typeEffectiveness.forEach(type => {
            if(!all_types[type]){
                all_types.push(type);
            }
        });
    }
}

Types.prototype.fill_types()
console.table(Types.all_types)

export {Types}
