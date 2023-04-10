import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import Product from "./Product";
import { Provider } from "react-redux";
import store from "../../store";
import { createServer } from "../../test/server";
createServer([
  {
    path: "https://api.darwichmeats.com/api/products",
    res: () => {
      return {
        products: [
          { _id: 1, name: "minute steaks" },
          { _id: 2, name: "beef mince" },
        ],
      };
    },
  },
]);

test("two products for each product", async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Product />
      </MemoryRouter>
    </Provider>
  );

  const anchorElements = await screen.findAllByRole("link", { href: true });
  const firstProduct = await screen.findByText(/minute steaks/i);
  const secondProduct = await screen.findByText(/beef mince/i);
  expect(firstProduct).toBeInTheDocument();
  expect(secondProduct).toBeInTheDocument();
  expect(anchorElements).toHaveLength(4);
});
// const pause = () =>
//   new Promise((resolve) => {
//     setTimeout(resolve, 100);
//   });
