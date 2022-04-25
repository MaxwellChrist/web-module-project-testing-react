import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Episode from './../Episode';

const episodeList = {
    id: 1, 
    image: null, 
    name: 'super strange', 
    season: 1, 
    number: 12, 
    summary: 'this is my summary', 
    runtime: 43,
}

test("renders without error", () => {
    render(<Episode episode={episodeList}/>)
 });

test("renders the summary test passed as prop", () => { 
    render(<Episode episode={episodeList} />);

    const summaryTest = screen.getByTestId("summaryTest");
    const summaryValue = /this is my summary/i;

    expect(summaryTest).toBeInTheDocument();
    expect(summaryTest).toHaveTextContent(summaryValue);
    expect(summaryTest).toBeVisible();
});

test("renders default image when image is not defined", () => { 
    render(<Episode episode={episodeList}/>)
    const imageDefault = 'https://i.ibb.co/2FsfXqM/stranger-things.png'
    const image = screen.queryByRole('img');
    const imageAltTest = screen.queryByAltText('https://i.ibb.co/2FsfXqM/stranger-things.png')
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', imageDefault)
    expect(imageAltTest).toHaveAttribute('alt', imageDefault)
    screen.debug()
});

screen.debug()
