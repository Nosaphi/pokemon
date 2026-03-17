import { moves } from "./pokemon_moves.js";
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
        let attacks = moves.map(move => new Attack(move.id, move.name,
             move.type, move.power, move.duration_ms))
        let fast_moves = fastMoves.map(move => new Attack(move.id, move.name,
             move.type, move.power, move.duration_ms))
        let charged_moves = chargedMoves.map(move => new Attack(move.id, move.name,
             move.type, move.power, move.duration_ms))
        Attack.all_attacks = attacks
    }
}

console.log(Attack.all_attacks)
console.log("aaaa")