import React from "react";
import { NextPage } from "next";

/**
 * Components
 */
import PokemonCard from "../components/PokemonCard";

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
  props.pokemons.forEach(pokemon => {
    console.log(props.pokemons)
  })
  
  return (
    <main className={styles.container}>
      <section className={styles.content}>
        <h1 className={styles.title}>Pokedex Fatec</h1>

        {/* Listagem dos pokemons */}
        <div className={styles.resultsContainer}>
          <PokemonCard />
          <PokemonCard />
          <PokemonCard />
          <PokemonCard />
          <PokemonCard />
          <PokemonCard />
          <PokemonCard />
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
};
}
export default Home;
