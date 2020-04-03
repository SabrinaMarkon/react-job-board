import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";

afterEach(cleanup);

it("matches the App snapshot", () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});

it("includes the h1 text", () => {
  const { getByText } = render(<App />);
  const h1Text = getByText(/Software Jobs for UoPeople Students and Alumni/);
  expect(h1Text).toBeInTheDocument();
});

it("includes the h2 text", () => {
  const { getByText } = render(<App />);
  const h2Text = getByText(/Found \d+ Jobs/);
  expect(h2Text).toBeInTheDocument();
});

it("includes the UoPeople logo", () => {
  const { getByAltText } = render(<App />);
  const uopeopleImg = getByAltText(/University of the People Computer Science/);
  expect(uopeopleImg).toBeInTheDocument();
});

it("Has the page number text for the pagination", () => {
  const { getByText } = render(<App />);
  const pageNumText = getByText(/Page \d+ of \d+/);
  expect(pageNumText).toBeInTheDocument();
});

it("renders the copyright link", () => {
  const { getByText } = render(<App />);
  const footerLink = getByText(/Sabrina Markon/);
  expect(footerLink).toBeInTheDocument();
});

it("renders the heart in the footer", () => {
  const { getByText } = render(<App />);
  const heartElement = getByText(/❤/);
  expect(heartElement).toBeInTheDocument();
});

it("goes to the next page when the next button is clicked", () => {
  const { getByText } = render(<App />);
  // page x of y start text:
  const pageNumText = getByText(/Page \d+ of \d+/);
  const nextButton = getByText(/Next/);
  fireEvent.click(nextButton);
  expect(pageNumText.textContent).toBe(/Page 2 of \d+/);
});