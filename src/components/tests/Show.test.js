import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';
import userEvent from '@testing-library/user-event';

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

test('renders without errors', () => {
    render(<Show show={show} selectedSeason={"none"}/>)
 });

test('renders Loading component when prop show is null', () => { 
    render(<Show show={null} selectedSeason={"none"}/>)
    const loadingButton = screen.queryByTestId("loading-container");
    expect(loadingButton).toBeInTheDocument();
});

test('renders same number of options seasons are passed in', () => { 
    render(<Show show={show} selectedSeason={"none"}/>)
    const example = screen.queryAllByTestId("season-option");
    expect(example).toHaveLength(5)
});

test('handleSelect is called when an season is selected', () => { 
    render(<Show show={show} selectedSeason={"none"}/>)
    const seasonSelected = screen.queryAllByTestId("season-option");
    userEvent.click(seasonSelected[0]);
    const seasonName = screen.queryByText(/first/i)
    expect(seasonName).toBeInTheDocument()
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    const { rerender } = render(<Show show={show} selectedSeason={"none"}/>)
    const seasonSelected = screen.queryAllByTestId("season-option");
    let episodesContainer = screen.queryByTestId("episodes-container")
    expect(episodesContainer).not.toBeInTheDocument()

    rerender(<Show show={show} selectedSeason={0}/>);
    episodesContainer = screen.queryByTestId("episodes-container")
    expect(episodesContainer).toBeInTheDocument()
    screen.debug()

 });

