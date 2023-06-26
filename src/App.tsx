import TableSlow, { TableColumn } from "./TableSlow";
import { Product, increment, useAppDispatch, useAppSelector } from "./store";

function App() {
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
    <>
      <h1>Reactive Iteration - Demo</h1>
      <TableSlow rows={rows} columns={columns} />
    </>
  );
}

export default App;
