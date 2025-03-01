import { useMemo } from "react";
import TableMemo, { TableColumn } from "./TableMemo";
import {
  Product,
  increment,
  selectStocks,
  useAppDispatch,
  useAppSelector,
} from "./store";

function ProductTableMemo() {
  const rows = useAppSelector(selectStocks);
  const columns: TableColumn<Product>[] = useMemo(() => [
    { name: "name", Cell: ({ row }) => <>{row.name}</> },
    {
      name: "quantity",
      Cell: ({ row }) => {
        const { id, quantity } = row;
        const dispatch = useAppDispatch();
        const label = `${row.name} quantity`;
        const onClick = () => {
          dispatch(increment({ id }));
        };
        return (
          <button aria-label={label} onClick={onClick}>
            {quantity}
          </button>
        );
      },
    },
  ], []);
    return <TableMemo rows={rows} columns={columns} />;
}

export default ProductTableMemo;
