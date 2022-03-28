import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testa se o topo da aplicação contém um conjunto fixo de links de navegação',
  () => {
    it('O primeiro link deve possuir o texto Home', () => {
      renderWithRouter(<App />);
      const homeLink = screen.getByRole('link', { name: /home/i });
      expect(homeLink).toBeInTheDocument();
    });
    it('O segundo link deve possuir o texto About', () => {
      renderWithRouter(<App/>);
      const aboutLink = screen.getByRole('link', {name: /about/i});
      expect(aboutLink).toBeInTheDocument();
    });
    it('O terceiro link deve possuir o texto Favorite Pokémons', () => {
      renderWithRouter(<App/>);
      const favoritePokemonsLink = screen.getByRole('link', {name: /favorite pokémons/i});
      expect(favoritePokemonsLink).toBeInTheDocument();
    });
  });

describe('Testes de redirecionamento dos Links',
  () => {
    it('URL "/" => Home',
    () => {
      const { history } = renderWithRouter(<App />);
      const homeLink = screen.getByRole('link', 
      { name: /home/i });
      userEvent.click(homeLink);
      expect(history.location.pathname).toBe('/');
    });
    it('URL "/about" => About',
    () => {
      const { history } = renderWithRouter(<App />);
      const aboutLink = screen.getByRole('link', 
      { name: /about/i });
      userEvent.click(aboutLink);
      expect(history.location.pathname).toBe('/about');
    });
    it('URL "/favorites" => Pokémons Favoritados',
    () => {
      const { history } = renderWithRouter(<App />);
      const favoritePokemonsLink = screen.getByRole('link', 
      { name: /favorite pokémons/i });
      userEvent.click(favoritePokemonsLink);
      expect(history.location.pathname).toBe('/favorites');
    });
    it('URL desconhecida => NOT FOUND',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/not-a-link');
      expect(history.location.pathname).toBe('/notfound');
    });
  }
)