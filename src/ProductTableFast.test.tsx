import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProductTableFast from "./ProductTableFast";
import { Provider } from "react-redux";
import { store } from "./store";
import { getTraceCount, resetTraceCount } from "./trace";
import { TableFastRow } from "./TableFast";

vi.mock('./trace');

describe(ProductTableFast.name, () => {
  it('will re-render just that single row when it is changed', async () => {
    render(<Provider store={store}><ProductTableFast /></Provider>);

    const button = await screen.findByLabelText("Recycled Soft Pants quantity");
    expect(button).toHaveTextContent("0");
    expect(getTraceCount(TableFastRow.name)).toEqual(10); // Initially, all rows are rendered
    resetTraceCount(TableFastRow.name);
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByLabelText("Recycled Soft Pants quantity")).toHaveTextContent("1");            
    });
    expect(getTraceCount(TableFastRow.name)).toEqual(1); // Only this single row is rendered
  });
});