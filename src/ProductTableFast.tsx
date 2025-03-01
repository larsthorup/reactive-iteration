import TableFast, { TableColumn } from "./TableFast";
import { Product, increment, selectStockIds, useAppDispatch, useAppSelector } from "./store";

function ProductTableFast() {
  const ids = useAppSelector(selectStockIds);
  function useRow(id: string) {
    const row = useAppSelector((state) => state.stock[id]);
    return row;
  }
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
      <TableFast rowIds={ids} useRow={useRow} columns={columns} />
  );
}

export default ProductTableFast;