import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testando Pokemon Details', () => {
  const POKEMON_PAGE_LOCATION = '/pokemons/4';
  const POKEMON_NAME = 'Charmander';
  it('Teste se as informações detalhadas do Pokémon '
  + 'selecionado são mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push(POKEMON_PAGE_LOCATION);
    console.log(POKEMON_NAME);
    const pokemonDetails = screen.getByText(`${POKEMON_NAME} Details`);
    expect(pokemonDetails).toBeInTheDocument();
  });
});
