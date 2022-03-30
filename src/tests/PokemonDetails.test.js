import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testando Pokemon Details', () => {
  const POKEMON_ID = 4;
  const POKEMON_PAGE_LOCATION = '/pokemons/4';
  const POKEMON_NAME = 'Charmander';
  const POKEMON_LOCATIONS = [
    'Alola Route 3',
    'Kanto Route 3',
    'Kanto Route 4',
    'Kanto Rock Tunnel',
  ];
  const POKEMON_IMAGES = [
    'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
    'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
    'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
    'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
  ];
  it('Teste se as informações detalhadas do Pokémon '
  + 'selecionado são mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push(POKEMON_PAGE_LOCATION);
    const pokemonDetails = screen.getByText(`${POKEMON_NAME} Details`);
    const heading = screen.getByRole('heading',
      { name: /summary/i, level: 2 });
    const summary = screen.getByText('The flame on its tail shows the strength of '
    + 'its life force. If it is weak, the flame also burns weakly.');
    expect(pokemonDetails).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
  });
  it('Teste se existe na página uma seção '
  + 'com os mapas contendo as localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(POKEMON_PAGE_LOCATION);
    const heading = screen.getByRole('heading',
      { name: `Game Locations of ${POKEMON_NAME}`, level: 2 });
    expect(heading).toBeInTheDocument();
    POKEMON_LOCATIONS.forEach((location) => {
      const caughtLocation = screen.getByText(location);
      expect(caughtLocation).toBeInTheDocument();
    });
    const caughtImages = [];
    const caughtObj = screen.getAllByRole('img', {
      alt: `${POKEMON_NAME} location`,
    });
    for (let i = 1; i <= POKEMON_IMAGES.length; i += 1) {
      const currentObj = Object.values(Object.values(caughtObj)[i])[1];
      if (currentObj.alt === `${POKEMON_NAME} location`) {
        caughtImages.push(currentObj.src);
      }
    }
    const includeAllImages = POKEMON_IMAGES.every((img) => caughtImages.includes(img));
    expect(includeAllImages).toBeTruthy();
  });
  it('Teste se o usuário pode favoritar um pokémon da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    history.push(POKEMON_PAGE_LOCATION);
    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);
    let favoritePokemonIds = JSON.parse(localStorage.getItem('favoritePokemonIds'));
    expect(favoritePokemonIds[0]).toBe(POKEMON_ID);
    userEvent.click(checkbox);
    favoritePokemonIds = JSON.parse(localStorage.getItem('favoritePokemonIds'));
    expect(favoritePokemonIds.length).toBe(0);
    const label = screen.getByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });
});
