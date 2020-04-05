/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, cleanup, fireEvent, waitForDomChange, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from 'react-dom/test-utils';
import App from "../App";

afterEach(cleanup);

it("matches the App snapshot", () => {
  const { asFragment } = render(<App />);
  // expect(asFragment()).toMatchInlineSnapshot();
  expect(asFragment()).toMatchSnapshot();
});

it("includes the h1 text", () => {
  const { getByText } = render(<App />);
  const h1Text = getByText(/Software Jobs for UoPeople Students and Alumni/i);
  expect(h1Text).toBeInTheDocument();
});

it("includes the h2 text", () => {
  const { getByText } = render(<App />);
  const h2Text = getByText(/Found \d+ Jobs/i);
  expect(h2Text).toBeInTheDocument();
});

it("includes the UoPeople logo", () => {
  const { getByAltText } = render(<App />);
  const uopeopleImg = getByAltText(/University of the People Computer Science/i);
  expect(uopeopleImg).toBeInTheDocument();
});

it("Has the page number text for the pagination", () => {
  const { getByText } = render(<App />);
  const pageNumText = getByText(/Page \d+ of \d+/i);
  expect(pageNumText).toBeInTheDocument();
});

it("renders the copyright link", () => {
  const { getByText } = render(<App />);
  const footerLink = getByText(/Sabrina Markon/i);
  expect(footerLink).toBeInTheDocument();
});

it("renders the heart in the footer", () => {
  const { getByText } = render(<App />);
  const heartElement = getByText(/❤/i);
  expect(heartElement).toBeInTheDocument();
});

it("goes to page 2 when the next button is clicked", () => {
  const { getByText, getByRole } = render(<App />);
  act(async () => {
    const nextButton = getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton);
    // page x of y text after Next button is clicked:
    const pageNumText = await waitForElement(() => getByText(/Page 2 of \d+/i));
    expect(pageNumText).toBeInTheDocument();
  });
});

// it("goes to page 1 when the back button is clicked", () => {
//   const { getByText, getByRole, debug } = render(<App />);
//   debug();
//   act(async () => {
//     const backButton = getByRole('button', { name: /Back/i });
//     fireEvent.click(backButton);
//     // page x of y text after Back button is clicked:
//     const pageNumText = await waitForElement(() => getByText(/Page 1 of \d+/i));
//     expect(pageNumText).toBeInTheDocument();
//   });
// });

