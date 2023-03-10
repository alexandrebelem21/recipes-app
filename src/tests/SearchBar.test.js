import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import SearchBar from '../components/SearchBar';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';

describe('teste', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
  });

  const searchInput = 'search-input';
  const nameSearchRadio = 'name-search-radio';
  const searchBtn = 'exec-search-btn';

  test('Se os elementos renderizam', () => {
    renderWithRouter(
      <SearchBar />,
    );
    const search = screen.getByTestId(searchInput);
    const ingrSearch = screen.getByTestId('ingredient-search-radio');
    const nameSearch = screen.getByTestId(nameSearchRadio);
    const letterSearch = screen.getByTestId('first-letter-search-radio');
    const btnSearch = screen.getByTestId(searchBtn);
    expect(search).toBeInTheDocument();
    expect(ingrSearch).toBeInTheDocument();
    expect(nameSearch).toBeInTheDocument();
    expect(letterSearch).toBeInTheDocument();
    expect(btnSearch).toBeInTheDocument();
  });

  test('Se busca', async () => {
    renderWithRouter(
      <SearchBar />,
    );

    const search = screen.getByTestId(searchInput);
    userEvent.type(search, 'Chicken');

    const ingrSearch = screen.getByTestId('ingredient-search-radio');
    userEvent.click(ingrSearch);

    const btnSearch = screen.getByTestId(searchBtn);
    userEvent.click(btnSearch);
  });
  test('Global Alert se digitar mais de um caracter', () => {
    renderWithRouter(
      <SearchBar />,
    );
    const mockAlert = jest.spyOn(global, 'alert');
    const search = screen.getByTestId(searchInput);
    const btnSearch = screen.getByTestId(searchBtn);
    const letterSearch = screen.getByTestId('first-letter-search-radio');

    userEvent.click(letterSearch);
    userEvent.type(search, 'aa');
    userEvent.click(btnSearch);
    expect(mockAlert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });
  test('redireciona', async () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
    const buttonForSearchBar = 'search-top-btn';
    const email = 'email-input';
    const emailValue = 'test@trybe.com';
    const password = 'password-input';
    const inputEmail = screen.getByTestId(email);
    userEvent.type(inputEmail, emailValue);

    const inputPassword = screen.getByTestId(password);
    userEvent.type(inputPassword, '1234567');

    expect(history.location.pathname).toBe('/');

    const btnEnter = screen.getByRole('button', { name: /Login/i });
    userEvent.click(btnEnter);

    expect(history.location.pathname).toBe('/meals');

    // userEvent.click(await screen.findByTestId('Beef-category-filter'));
    // const pfl = await screen.findByTestId('profile-top-btn');
    // userEvent.click(pfl);
    const searchButton = await screen.findByTestId(buttonForSearchBar);
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);
    const search = screen.getByTestId(searchInput);
    const btnSearch = screen.getByTestId(searchBtn);
    const nameSearch = screen.getByTestId(nameSearchRadio);
    userEvent.click(nameSearch);
    userEvent.type(search, 'Gohan');
    userEvent.click(btnSearch);
    expect(history.location.pathname).toBe('/meals');
  });
  test('Global Alert se digitar nao retornar', () => {
    renderWithRouter(
      <SearchBar />,
    );

    const mockAlert = jest.spyOn(global, 'alert');
    const search = screen.getByTestId(searchInput);
    const btnSearch = screen.getByTestId(searchBtn);
    const nameSearch = screen.getByTestId(nameSearchRadio);

    userEvent.click(nameSearch);
    userEvent.type(search, 'xablau');
    userEvent.click(btnSearch);
    expect(mockAlert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
  });

  const buttonForSearchBar = 'search-top-btn';

  it('V', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');

    const searchButton = await screen.findByTestId(buttonForSearchBar);
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    const search = screen.getByTestId(searchInput);
    userEvent.type(search, 'Chicken');
    const nameSearch = screen.getByTestId(nameSearchRadio);
    userEvent.click(nameSearch);
    const btnSearch = screen.getByTestId(searchBtn);
    userEvent.click(btnSearch);

    // const ck = await screen.findAllByTestId(/-recipe-card/);
    // expect(ck.length).toBe(12);
  });
  it('V', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    // expect(history.location.pathname).toBe('/meals');

    const searchButton = await screen.findByTestId(buttonForSearchBar);
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    const search = screen.getByTestId(searchInput);
    userEvent.type(search, 'Chicken');
    const nameSearch = screen.getByTestId(nameSearchRadio);
    userEvent.click(nameSearch);
    const btnSearch = screen.getByTestId(searchBtn);
    userEvent.click(btnSearch);
    // expect(history.location.pathname).toBe('/meals/53033');
    // const ck = await screen.findAllByTestId(/-recipe-card/);
    // expect(ck.length).toBe(2);
  });
});
// });
