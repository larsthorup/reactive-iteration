import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProductTableMemo from "./ProductTableMemo";
import { Provider } from "react-redux";
import { store } from "./store";
import { getTraceCount, resetTraceCount } from "./trace";
import { TableMemoRow } from "./TableMemo";

vi.mock('./trace');

describe(ProductTableMemo.name, () => {
  it('will re-render just that single row when it is changed', async () => {
    render(<Provider store={store}><ProductTableMemo /></Provider>);

    const button = await screen.findByLabelText("Recycled Soft Pants quantity");
    expect(button).toHaveTextContent("0");
    expect(getTraceCount(TableMemoRow.name)).toEqual(10); // Initially, all rows are rendered
    resetTraceCount(TableMemoRow.name);
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByLabelText("Recycled Soft Pants quantity")).toHaveTextContent("1");            
    });
    expect(getTraceCount(TableMemoRow.name)).toEqual(1); // Only this single row is rendered
  });
});