import { Attack } from "./class_attack.js";
import { Type } from "./class_type.js";
import { pokemons } from "./pokemons.js";
import { pokemon_types } from "./pokemon_types.js";

class Pokemon {
    static all_pokemons
    constructor(id, nom, stamina, baseAttaque, baseDefense, attaquesRapides, attaquesChargees) {
        this.id = id;
        this.nom = nom;
        this.stamina = stamina;
        this.baseAttaque = baseAttaque;
        this.baseDefense = baseDefense;
        this.types = []
        this.attaquesRapides = attaquesRapides;
        this.attaquesChargees = attaquesChargees;
    }

    toString(){
        if(this.types.length===0){
            this.getTypes();
        }
        else if(this.types.length===1){
            return this.nom+" : #"+this.id+", ["+this.types[0].nom+"], [STA: "+this.stamina+
            ", ATK: "+this.baseAttaque+", DEF: "+this.baseDefense+", Rapides = ["+
            this.attaquesRapides+"], Chargées = ["+this.attaquesChargees+"]";
        }
        else{
            return this.nom+" : #"+this.id+", ["+this.types[0].nom+","+this.types[1].nom+"], [STA: "+this.stamina+
            ", ATK: "+this.baseAttaque+", DEF: "+this.baseDefense+", Rapides = ["+
            this.attaquesRapides+"], Chargées = ["+this.attaquesChargees+"]";
        }
        
    }

    static fill_all_pokemons(){
        Pokemon.all_pokemons = pokemons.map(pokemon => new Pokemon(pokemon.pokemon_id, pokemon.pokemon_name, pokemon.stamina, pokemon.base_attack, pokemon.base_defense, pokemon.type,
             pokemon.fast_moves, pokemon.charged_moves))
    }

    getTypes(){
        const monPokemon = pokemon_types.find(p => p.pokemon_name === this.nom);
        let types = monPokemon.type.map(t => new Type(t));
        this.types = types;
        return types;
    }

    getAttacks(){
        return [this.attaquesRapides, this.attaquesChargees] 
    }
}



let testPokemon = new Pokemon(
    77,
    "Ponyta",
    45,
    49,
    49,
    ["Tackle"],
    ["Vine Whip"]
);

console.log(testPokemon.getTypes())
console.log(testPokemon.toString())

console.log(testPokemon.getAttacks())



export {Pokemon}