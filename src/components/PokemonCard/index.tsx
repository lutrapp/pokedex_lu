import React from "react";
import Image from "next/image";

// Styles
import styles from "./styles.module.css";

//  Components
import Pokeball from "../Pokeball";

// integrando com map
// Types
import {Pokemon} from '../../types/pokemon'
interface Props {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<Props> = (props) => {
  console.log(props.pokemon)
  return (
    <div className={styles.container}>
      {/* Informações do pokemon */}
      <div className={styles.info}>
        <h1>{props.pokemon.name}</h1>
        <div className={styles.type}>
          
          {props.pokemon.pokemonTypes.map(function(type) {
            return <span key={type.name}>{type.name}</span>
          })}

          {/* <span>Eletric</span>
          <span>Water</span> */}
        </div>
      </div>
      {/* Pokeball e foto do Pokemon */}
      <div className={styles.pokeball}>
        <Pokeball />
        <div className={styles.image}>
          <Image 
          src={props.pokemon.sprites.other['official-artwork']. front_default}
          alt="Pokemon"
          layout="fill"
          objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
