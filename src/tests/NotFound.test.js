import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testando o componente Not Found', () => {
  it('Testa se a página contém um heading `h2` com o texto '
  + '`Page requested not found 😭', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/not-a-real-page');
    const heading = screen.getByRole('heading',
      { level: 2, name: /page requested not found/i });
    expect(heading).toBeInTheDocument();
  });
  it('Testa se a página mostra a imagem `https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/not-a-real-page');
    const image = screen.getByRole('img',
      { name: /pikachu crying because the page requested was not found/i });
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
