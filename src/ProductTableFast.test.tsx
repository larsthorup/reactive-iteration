import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProductTableFast from "./ProductTableFast";
import { Provider } from "react-redux";
import { store } from "./store";

describe(ProductTableFast.name, () => {
  it('will re-render all rows when a single row is changed', async () => {
    render(<Provider store={store}><ProductTableFast /></Provider>);

    const button = await screen.findByLabelText("Recycled Soft Pants quantity");
    expect(button).toHaveTextContent("0");
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByLabelText("Recycled Soft Pants quantity")).toHaveTextContent("1");            
    });
  });
});