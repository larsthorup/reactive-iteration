import { useCallback, useMemo } from "react";
import TableProper, { TableColumn } from "./TableProper";
import { Product, increment, useAppDispatch, useAppSelector } from "./store";
import { createSelector } from "@reduxjs/toolkit";

const selectRows = createSelector(
  (state) => state.stock,
  (stock) => Object.values(stock),
);

function RenderCell({ row }) {
  const { id, quantity } = row;
  const dispatch = useAppDispatch();
  const label = `${row.name} quantity`;
  const onClick = useCallback(() => {
    dispatch(increment({ id }));
  }, [dispatch, id]);
  return (
    <button aria-label={label} onClick={onClick}>
      {quantity}
    </button>
  );
}
const RenderRow = ({ row }) => <>{row.name}</>;

const columns: TableColumn<Product>[] = [
  { name: "name", Cell: RenderRow },
  {
    name: "quantity",
    Cell: RenderCell,
  },
];
function ProductTableProper() {
  const rows = useAppSelector(selectRows);
  return <TableProper rows={rows} columns={columns} />;
}

export default ProductTableProper;

