import { Attack } from "./class_attack.js";
import { Type } from "./class_type.js";
import { pokemons } from "./pokemons.js";
import { pokemon_moves } from './pokemon_moves.js'
import { pokemon_types } from "./pokemon_types.js";

class Pokemon {
    static all_pokemons
    constructor(nom, forme, attaquesRapides, attaquesChargees) {
        //this.id = id;
        this.nom = nom;
        this.form = forme;
        this.id = pokemons.find(p => p.pokemon_name === this.nom && p.form === this.form).pokemon_id;
        this.stamina = pokemons.find(p => p.pokemon_name === this.nom && p.form === this.form).base_stamina;
        this.baseAttaque = pokemons.find(p => p.pokemon_name === this.nom && p.form === this.form).base_attack;
        this.baseDefense = pokemons.find(p => p.pokemon_name === this.nom && p.form === this.form).base_defense;
        this.types = [];
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

    static fill_all_pokemons() {
        Pokemon.all_pokemons = pokemons.map(pokemon => {
            const moveData = pokemon_moves.find(m => 
                m.pokemon_id === pokemon.pokemon_id && m.form === pokemon.form
            );
            const typeData = pokemon_types.find(t => 
                t.pokemon_id === pokemon.pokemon_id && t.form === pokemon.form
            );

            return new Pokemon(
                pokemon.pokemon_id,
                pokemon.pokemon_name,
                pokemon.form,
                typeData ? typeData.type : [],
                moveData ? moveData.fast_moves : [],
                moveData ? moveData.charged_moves : []
            );
        });
    }

    getTypes(){
        const monPokemon = pokemon_types.find(p => p.pokemon_name === this.nom && p.form === this.form);
        let types = monPokemon.type.map(t => new Type(t));
        this.types = types;
        return types;
    }

    getAttacks(){
        const monPokemon = pokemon_moves.find(p => p.pokemon_name === this.nom && p.form === this.form);
        let attaquesChargees = monPokemon.charged_moves.map(m => new Attack(m));
        this.attaquesChargees = attaquesChargees; 
        let attaquesRapides = monPokemon.fast_moves.map(m => new Attack(m));
        this.attaquesRapides = attaquesRapides; 
        return attaquesRapides, attaquesChargees;
    }
}

console.log(pokemons.find(p => p.pokemon_name === "Bulbasaur" && p.form === "Normal").base_attack)
let testPokemon = new Pokemon(
    "Bulbasaur",
    "Normal",
    ["Tackle"],
    ["Vine Whip"]
);

console.log(testPokemon.getTypes())
console.log(testPokemon.toString())
console.log(testPokemon.getAttacks())



export {Pokemon}