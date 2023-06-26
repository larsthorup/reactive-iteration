import TableSlow, { TableColumn } from "./TableSlow";
import { Product, increment, useAppDispatch, useAppSelector } from "./store";

function ProductTableSlow() {
  const rows = useAppSelector((state) => Object.values(state.stock));
  const columns: TableColumn<Product>[] = [
    { name: "name", Cell: ({ row }) => <>{row.name}</> },
    {
      name: "quantity",
      Cell: function ({ row }) {
        const { id, quantity } = row;
        const dispatch = useAppDispatch();
        const onClick = () => { 
          dispatch(increment({ id }));
        };
        return <button onClick={onClick}>{quantity}</button>;
      },
    },
  ];
  return (
      <TableSlow rows={rows} columns={columns} />
  );

}
export default ProductTableSlow;