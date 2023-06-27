import { memo, useMemo } from "react";
import TableFast, { TableColumn } from "./TableFast";
import { Product, increment, useAppDispatch, useAppSelector } from "./store";

function ProductTableFast() {
  const stock = useAppSelector((state) => state.stock);
  const ids = useMemo(() => Object.keys(stock), [stock]);
  return <ProductTableFastMemoed ids={ids} />;
}

const ProductTableFastMemoed = memo(function ProductTableFastMemoed({ids}: {ids: string[]}) {
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
}, ({ids: prevIds}, {ids: nextIds}) => prevIds.length === nextIds.length && prevIds.every((id, i) => id === nextIds[i]));

export default ProductTableFast;