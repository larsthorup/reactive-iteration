import { useCallback } from "react";
import TableMemo, { TableColumn } from "./TableMemo";
import { Product, increment, selectStocks, useAppDispatch, useAppSelector } from "./store";

function RenderCell({ row }: { row: Product }) {
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
const RenderRow = ({ row }: { row: Product}) => <>{row.name}</>;

const columns: TableColumn<Product>[] = [
  { name: "name", Cell: RenderRow },
  {
    name: "quantity",
    Cell: RenderCell,
  },
];
function ProductTableMemo() {
  const rows = useAppSelector(selectStocks);
  return <TableMemo rows={rows} columns={columns} />;
}

export default ProductTableMemo;

