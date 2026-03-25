import { fast_moves } from "./fast_moves.js";
import { charged_moves } from "./charged_moves.js"; 

class Attack{
    static all_attacks;
    constructor(move_id, nom, type, puissance, duree) {
        this.move_id = move_id;
        this.nom = nom;
        this.type = type;
        this.puissance = puissance;
        this.duree = duree;
    }

    toString(){
        return this.nom+" : #"+this.id+", "+this.type+", "+this.puissance+
        ", "+this.duree+"ms"
    }

    static fill_attacks(){
        let fast_attacks = fast_moves.map(move => new Attack(move.move_id, move.name,
             move.type, move.power, move.duration))
        let charged_attacks = charged_moves.map(move => new Attack(move.move_id, move.name,
             move.type, move.power, move.duration))
        Attack.all_attacks = fast_attacks.concat(charged_attacks)
    }
}
Attack.fill_attacks()
let charge = new Attack(1, "Charge", "Normal", 15, 500)
console.log(charge.toString())
//console.table(Attack.all_attacks)

export {Attack}
