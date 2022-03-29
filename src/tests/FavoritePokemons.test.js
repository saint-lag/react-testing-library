import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testando componente Favorite Pokemons', () => {
  it('Testa se é exibido na tela a mensagem `No favorite pokemon found`, se a pessoa não tiver pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons/>);
    const notFoundText = screen.getByText('No favorite pokemon found');
    expect(notFoundText).toBeInTheDocument();
  });
  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const mock = [{
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      averageWeight: {
        value: '6.0',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
      foundAt: [
        {
          location: 'Kanto Viridian Forest',
          map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
        },
        {
          location: 'Kanto Power Plant',
          map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
        },
      ],
      summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
    },
    {
      id: 4,
      name: 'Charmander',
      type: 'Fire',
      averageWeight: {
        value: '8.5',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
      foundAt: [
        {
          location: 'Alola Route 3',
          map: 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
        },
        {
          location: 'Kanto Route 3',
          map: 'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
        },
        {
          location: 'Kanto Route 4',
          map: 'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
        },
        {
          location: 'Kanto Rock Tunnel',
          map: 'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
        },
      ],
      summary: 'The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly.',
    },
    {
      id: 23,
      name: 'Ekans',
      type: 'Poison',
      averageWeight: {
        value: '6.9',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Ekans_(Pok%C3%A9mon)',
      foundAt: [
        {
          location: 'Goldenrod Game Corner',
          map: 'https://cdn2.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png',
        },
      ],
      summary: 'It can freely detach its jaw to swallow large prey whole. It can become too heavy to move, however.',
    },
  ];
    renderWithRouter(<FavoritePokemons pokemons={ mock } />);
    const pikachuTitle = screen.getByText(/pikachu/i);
    const charmanderType = screen.getByText(/fire/i);
    const ekansWeight = screen.getByText(/6.9/i);
    
    expect(pikachuTitle).toBeInTheDocument();
    expect(charmanderType).toBeInTheDocument();
    expect(ekansWeight).toBeInTheDocument();
  });
})