import React, {useState} from "react";
import Head from "next/head";
import { NextPage } from "next";

/**
 * Components
 */
import PokemonCard from "../components/PokemonCard";
import Input from "../components/Input"

/**
 * Styles
 */
import styles from "../styles/pages/Home.module.css";

/** Services */
import { fetchPokemons} from "../services/pokemon";
import { Pokemon } from "../types/pokemon";

/** é como se fosse uma roupa */
/** poderia ter escrito a linha abaixo da interface assim pokemons: Array<pokemons> */

interface Props {
  pokemons: Pokemon[];
}

const Home = (props: Props) => {
  const [search, setSearch] = useState("");
  // Estado para os pokemons
  // O estado inicial é aquele que vem das props
  // Estamos fazendo isso porque não podemos alterar a props diretamente
  // Só se pode alterar o estado
  const [statePokemons, setStatePokemons] = useState(props.pokemons);

  // Lidar com o evento "digitar" no input
  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value === '') {
      setStatePokemons([]);
    }
    setSearch(event.target.value);

    // Array filter = filtra os valores baseado em uma condição
    const regex = `${event.target.value}.*`;

    // filtrar os pokemons com a regex
    const filteredPokemons = props.pokemons.filter((pokemon) => pokemon.name.match(new RegExp(regex, "is"))
    );
      
    setStatePokemons(filteredPokemons);
    
    // console.log(filteredPokemons);
  }

    return (
    <main className={styles.container}>
      <Head>
        <title>Pokedex Fatec</title>
      </Head>
      <section className={styles.content}>
        <h1 className={styles.title}>Pokedex Fatec</h1>

        <div className={styles.inputContainer}>
          <Input 
          onChange={handleOnChange}
          value={search}
          placeholder="Digite o nome do pokémon"
          />
        </div>

        {/* Listagem dos pokemons */}
        <div className={styles.resultsContainer}>
          {statePokemons.map(function(pokemon) {
            // precisa atribuir uma key
            return <PokemonCard key={pokemon.id} pokemon={pokemon} />
          })}
        </div>
      </section>
    </main>
  );
};
/** Buscando dados da pokeapi.co
 * getStaticProps fará a busca de dados na API */ 
export async function getStaticProps() {
  const pokemons = await fetchPokemons();

return {
  props: {
    pokemons: pokemons,
  },
  // INCREMENTAL STATIC REGENERATION
  revalidate: 1,
};
}
export default Home;
