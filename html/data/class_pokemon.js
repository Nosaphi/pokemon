import { Attaque } from "./class_attack.js";
import { Type } from "./class_type.js";
import { pokemons } from "./pokemons.js"

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

    fill_all_pokemons(){
        Pokemon.all_pokemons = pokemons.map(pokemon => new Pokemon(pokemon.pokemon_id, pokemon.pokemon_name, pokemon.stamina, pokemon.base_attack, pokemon.base_defense, pokemon.type,
             pokemon.fast_moves, pokemon.charged_moves))
    }

    getTypes(){
        return this.types;
    }

    getAttacks(){
        let attacks = this.attaquesChargées + this.attaquesRapides

        return attacks
    }
}