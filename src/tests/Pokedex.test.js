import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testando a Pokédex', () => {
  beforeEach(() => renderWithRouter(<App />));
  it('Teste se página contém um heading `h2` com o texto `Encountered pokémons`', () => {
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });
  it('O botão deve conter o texto Próximo pokémon', () => {
    const nextPokemonBtn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(nextPokemonBtn).toBeInTheDocument();
  });
  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    const nextPokemonBtn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    for (let i = 0; i <= pokemons.length; i += 1) {
      const DATA_TEST_ID_POKEMON_NAME = 'pokemon-name';
      const pokemonNamesTester = screen.getAllByTestId(DATA_TEST_ID_POKEMON_NAME);
      const previousPokemonName = Object.values(
        screen.getByTestId(DATA_TEST_ID_POKEMON_NAME),
      )[1].children;
      userEvent.click(nextPokemonBtn);
      const currentPokemonName = Object.values(
        screen.getByTestId(DATA_TEST_ID_POKEMON_NAME),
      )[1].children;
      expect(pokemonNamesTester).toHaveLength(1);
      const bool = previousPokemonName !== currentPokemonName;
      expect(bool).toBeTruthy();
    }
  });
  it('Teste se a Pokédex tem os botões de filtro', () => {
    const NUMBER_OF_FILTERS = 7;
    const filterByAll = screen.getByRole('button', { name: /all/i });
    expect(filterByAll).toBeInTheDocument();
    const filters = screen.getAllByTestId('pokemon-type-button');
    expect(filters).toHaveLength(NUMBER_OF_FILTERS);
    const filtersTypes = filters.map(
      (filter) => Object.values(filter)[1].children,
    );
    const filtersTypesSet = new Set(filtersTypes);
    expect([...filtersTypesSet].length).toEqual(filtersTypes.length);
  });
  it(
    'A partir da seleção de um botão de tipo,'
      + 'a Pokédex deve circular somente pelos pokémons daquele tipo',
    () => {
      const filters = screen.getAllByTestId('pokemon-type-button');
      const nextPokemonBtn = screen.getByRole('button', {
        name: /próximo pokémon/i,
      });
      filters.forEach((filter) => {
        userEvent.click(filter);
        const type = Object.values(filter)[1].children;
        const pokemonsOfCurrentType = [];
        let bool = true;
        while (bool) {
          const pokemonName = Object.values(
            screen.getByTestId('pokemon-name'),
          )[1].children;
          if (pokemonsOfCurrentType.includes(pokemonName)) { (bool = false); } else {
            pokemonsOfCurrentType.push(pokemonName);
          }
          const currentPokemonType = Object.values(
            screen.getByTestId('pokemon-type'),
          )[1].children;
          expect(type).toBe(currentPokemonType);
          userEvent.click(nextPokemonBtn);
        }
      });
    },
  );
  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const filterByAll = screen.getByRole('button', { name: /all/i });
    userEvent.click(filterByAll);
    const nextPokemonBtn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    const allTypes = [
      'Eletric',
      'Fire,',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    const allFoundTypes = [];
    const CLICKS = 20;
    for (let i = 0; i <= CLICKS; i += 1) {
      const currentPokemonType = Object.values(
        screen.getByTestId('pokemon-type'),
      )[1].children;
      allFoundTypes.push(currentPokemonType);
      userEvent.click(nextPokemonBtn);
    }
    expect(allTypes.length).toEqual([...new Set(allFoundTypes)].length);
  });
});
