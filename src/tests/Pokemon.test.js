import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testando Card do Pokemon', () => {
  const POKEMON_NAME = 'Pikachu';
  const POKEMON_ID = '25';
  const POKEMON_TYPE = 'Electric';
  const POKEMON_LOCATION_PAGE = `/pokemons/${POKEMON_ID}`;
  const POKEMON_WEIGHT = 'Average weight: 6.0 kg';
  const POKEMON_SPRITE = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
  const STAR_ICON_SRC = '/star-icon.svg';

  it('Informações do Pokemon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonSprite = screen.getByRole('img',
      { src: POKEMON_SPRITE, alt: `${POKEMON_NAME} sprite` });

    expect(pokemonName).toHaveTextContent(POKEMON_NAME);
    expect(pokemonType).toHaveTextContent(POKEMON_TYPE);
    expect(pokemonWeight).toHaveTextContent(POKEMON_WEIGHT);
    expect(pokemonSprite).toHaveAttribute('src', POKEMON_SPRITE);
    expect(pokemonSprite).toHaveAttribute('alt', `${POKEMON_NAME} sprite`);
  });
  it('Link de Navegação', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link',
      { name: /more details/i, href: POKEMON_LOCATION_PAGE });
    expect(detailsLink).toBeDefined();

    userEvent.click(detailsLink);
    const detailsHeading = screen.getByRole('heading', {
      name: `${POKEMON_NAME} Details`, level: 2,
    });

    expect(detailsHeading).toBeInTheDocument();
    expect(history.location.pathname).toBe(POKEMON_LOCATION_PAGE);
  });
  it('Ícone de Estrela nos Favoritados', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
      href: POKEMON_LOCATION_PAGE,
    });

    userEvent.click(detailsLink);

    const checkbox = screen.getByRole('checkbox', { id: 'favorite' });

    userEvent.click(checkbox);

    const favoritePokemonIds = JSON.parse(localStorage.getItem('favoritePokemonIds'));
    const starIcon = screen.getByAltText(`${POKEMON_NAME} is marked as favorite`);

    expect(favoritePokemonIds[0]).toBe(Number(POKEMON_ID));
    expect(starIcon).toBeInTheDocument();
    expect(starIcon).toHaveAttribute('src', STAR_ICON_SRC);
  });
});
