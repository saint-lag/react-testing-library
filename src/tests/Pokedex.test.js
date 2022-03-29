import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';

describe('Testando a Pokédex', () => {
  beforeEach(() => renderWithRouter(<App />));
  it('Teste se página contém um heading `h2` com o texto `Encountered pokémons`', () => {
    const heading = screen.getByRole('heading', { level: 2, name: /encountered pokémons/i });
    expect(heading).toBeInTheDocument();
  });
  it('O botão deve conter o texto Próximo pokémon', () => {
    const nextPokemonBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextPokemonBtn).toBeInTheDocument();
  });
  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    const nextPokemonBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    for(let i = 0; i <= pokemons.length; i++) {
      const pokemonNamesTester = screen.getAllByTestId('pokemon-name');
      const previousPokemonName = screen.getByTestId('pokemon-name');
      userEvent.click(nextPokemonBtn);
      const currentPokemonName = screen.getByTestId('pokemon-name');
      expect(pokemonNamesTester).toHaveLength(1);
      console.log(previousPokemonName, currentPokemonName);
      const bool = previousPokemonName !== currentPokemonName;
      expect(bool).toBeTruthy();
  }
  });
  it('Teste se a Pokédex tem os botões de filtro', () => {
    const filterByAll = screen.getByRole('button', { name: /all/i });
    expect(filterByAll).toBeInTheDocument();
    const filters = screen.getAllByTestId('pokemon-type-button');
    expect(filters).toHaveLength(7);
    // filters.forEach((filter) => console.log(filter.return));
  });
});