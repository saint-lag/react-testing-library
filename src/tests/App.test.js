import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Teste se o topo da aplicação contém um conjunto fixo de links de navegação',
  () => {
    it('O primeiro link deve possuir o texto Home', () => {
      renderWithRouter(<App />);
    });
    it('O segundo link deve possuir o texto About', () => {});
    it('O terceiro link deve possuir o texto Favorite Pokémons', () => {});
  });
