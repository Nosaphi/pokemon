import { Attaque } from "./attaque.js";
import { Type } from "./type.js";

class Pokemon {
    static all_pokemons
    constructor(id, nom, stamina, baseAttaque, baseDefense, types, attaquesRapides, attaquesChargées) {
        this.id = id;
        this.nom = nom;
        this.stamina = stamina;
        this.baseAttaque = baseAttaque;
        this.baseDefense = baseDefense;
        this.types = types;
        this.attaquesRapides = attaquesRapides;
        this.attaquesChargées = attaquesChargées;
    }

    toString(){
        return this.nom+" : #"+this.id+", ["+this.types+"], [STA: "+this.stamina+
        ", ATK: "+this.baseAttaque+", DEF: "+this.baseDefense+", Rapides = ["+
        this.attaquesRapides+"], Chargées = ["+this.attaquesChargées+"]";
    }

    getTypes(){
        return this.types;
    }

    getAttacks(){
        let attacks = this.attaquesChargées + this.attaquesRapides

        return attacks
    }
}