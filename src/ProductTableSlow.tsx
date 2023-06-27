import { useMemo } from "react";
import TableSlow, { TableColumn } from "./TableSlow";
import { Product, increment, useAppDispatch, useAppSelector } from "./store";

function ProductTableSlow() {
  const stock = useAppSelector((state) => state.stock);
  const rows = useMemo(() => Object.values(stock), [stock]);
  const columns: TableColumn<Product>[] = [
    { name: "name", Cell: ({ row }) => <>{row.name}</> },
    {
      name: "quantity",
      Cell: function ({ row }) {
        const { id, quantity } = row;
        const dispatch = useAppDispatch();
        const label = `${row.name} quantity`;
        const onClick = () => { 
          dispatch(increment({ id }));
        };
        return <button aria-label={label} onClick={onClick}>{quantity}</button>;
      },
    },
  ];
  return (
      <TableSlow rows={rows} columns={columns} />
  );
}

export default ProductTableSlow;