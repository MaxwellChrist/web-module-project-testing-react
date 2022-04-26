import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';
import userEvent from '@testing-library/user-event';
import mockFetchShow from './../../api/fetchShow';
jest.mock('./../../api/fetchShow');

const show = {
    name: "spongebob squarepants",
    summary: "he lives in a pineapple under the sea",
    seasons: [
        {id: 1, name: "first", episodes: []},
        {id: 2, name: "second", episodes: []},
        {id: 3, name: "third", episodes: []},
        {id: 4, name: "fourth", episodes: []},
        {id: 5, name: "fifth", episodes: []},
    ]
}

test('renders without errors with no props', async () => { 
    render(<Display />)
});

test('renders Show component when the button is clicked ', async () => { 
    mockFetchShow.mockResolvedValueOnce(show);
    render(<Display />);
    const button = screen.getByRole('button');
    userEvent.click(button);

    const newShow = await screen.findByTestId('show-container');
    expect(newShow).toBeInTheDocument();
});

test('renders show season options matching your data when the button is clicked', async () => { 
    mockFetchShow.mockResolvedValueOnce(show);
    render(<Display />);
    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() => {
        const options = screen.queryAllByTestId('season-option');
        expect(options).toHaveLength(5)
    })
});

test('displays testFunction when button is pressed', async () => { 
    mockFetchShow.mockResolvedValueOnce(show);
    const testFunction = jest.fn();
    render(<Display testFunction={testFunction} />);
    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() => {
        expect(testFunction).toHaveBeenCalled()
    })
});