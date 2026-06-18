function getPokemonsByType(typeName){
    Pokemon.fill_all_pokemons();
    let listePokemon = []
    for (const pokemon of Pokemon.all_pokemons) {
        let types = pokemon.getTypes();
        if(types[0].nom === typeName){
            listePokemon.push(pokemon)
        }
        else if(types.length === 2){
            if(types[1].nom === typeName){
                listePokemon.push(pokemon)
            }
        }
    }  
    return listePokemon;
}

function getPokemonsByAttack(attackName){
    Pokemon.fill_all_pokemons();
    let listePokemon = []
    for (const pokemon of Pokemon.all_pokemons) {
        let attaques = pokemon.getAttacks();
        for (let attaque of attaques){
            if (attaque.nom === attackName){
                listePokemon.push(pokemon)
            }
        }
    }
    return listePokemon
}

function getAttacksByType(typeName){
    Attack.fill_attacks();
    let listeAttaque = [];
    for(const attaques of Attack.all_attacks){
        if(attaques.type === typeName){
            listeAttaque.push(attaques)
        }
    }
    return listeAttaque;
}

function sortPokemonsByTypeThenName(){
    Pokemon.fill_all_pokemons();
    let listePokemon = []
    let listePokemonTrie = []
    for (const pokemon of Pokemon.all_pokemons) {
        // Si le pokémon à 2 types
        if(pokemon.types.length===2){
            // Comparer les chaines de caractères des deux types
            if(pokemon.types[0].nom.localeCompare(pokemon.types[1].nom) > 0){
                // Et inverser les types si le type numéro deux est devant le type numéro 1 alphabétiquement
                let temp = pokemon.types[0];
                pokemon.types[0]=pokemon.types[1];
                pokemon.types[1] = temp;
            }
        }
        listePokemon.push(pokemon)
        listePokemonTrie = listePokemon.sort((a,b) => {
            // Si le type du premier pokémon est devant le type du deuxième pokémon alphabétiquement
            // Alors il restera devant dans la liste, sinon il sera derrière
            let compare = a.types[0].nom.localeCompare(b.types[0].nom);  
            
            // S'ils ont le même premier type
            if(compare === 0){

                // Si l'un des deux est mono type, il passe devant dans la liste
                if(a.types.length===1){
                    return -1
                }
                if(b.types.length===1){
                    return 1
                }

                // Sinon, on compare son deuxième type
                let compareDeuxiemeType = a.types[1].nom.localeCompare(b.types[1].nom);  

                // S'ils ont le même double type, alors on compare alphabétiquement
                if(compareDeuxiemeType === 0){
                    return a.nom.localeCompare(b.nom);
                }
                return compare;
            }
            return compare;
        });
    }
    return listePokemonTrie;
}

