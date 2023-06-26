import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProductTableSlow from "./ProductTableSlow";
import { Provider } from "react-redux";
import { store } from "./store";
import { getTraceCount, resetTraceCount } from "./trace";
import { TableSlowRow } from "./TableSlow";

vi.mock('./trace');

describe(ProductTableSlow.name, () => {
  it('will re-render all rows when a single row is changed', async () => {
    render(<Provider store={store}><ProductTableSlow /></Provider>);

    const button = await screen.findByLabelText("Recycled Soft Pants quantity");
    expect(button).toHaveTextContent("0");
    expect(getTraceCount(TableSlowRow.name)).toEqual(10); // Initially, all rows are rendered
    resetTraceCount(TableSlowRow.name);
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByLabelText("Recycled Soft Pants quantity")).toHaveTextContent("1");            
    });
    expect(getTraceCount(TableSlowRow.name)).toEqual(10); // Note: all rows are re-rendered
  });
});