import { fastMoves } from "./fast_moves.js";
import { chargedMoves } from "./charged_moves.js"; 

class Attack{
    static all_attacks;
    constructor(id, nom, type, puissance, duree) {
        this.id = id;
        this.nom = nom;
        this.type = type;
        this.puissance = puissance;
        this.duree = duree;
    }

    toString(){
        return this.nom+" : #"+this.id+", "+this.type+", "+this.puissance+
        ", "+this.duree+"ms"
    }

    fill_attacks(){
        let fast_attacks = fastMoves.map(move => new Attack(move.move_id, move.name,
             move.type, move.power, move.duration))
        let charged_attacks = chargedMoves.map(move => new Attack(move.move_id, move.name,
             move.type, move.power, move.duration))
        Attack.all_attacks = fast_attacks.concat(charged_attacks)
    }
}
Attack.prototype.fill_attacks()
console.log(Attack(1, "Charge", "Normal", 15, 500).toString())
console.log(Attack.all_attacks)
console.log("aaaa")