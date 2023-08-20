import { memo, useMemo } from "react";
import TableFast, { TableColumn } from "./TableFast";
import { StockContextProvider, useStockContextSelector } from "./StockContextProvider";
import { Product } from "./store";

function ProductTableWithContextProvider() {
  return (
    <StockContextProvider>
      <ProductTableWithContext />
    </StockContextProvider>
  );
}

function ProductTableWithContext() {
  const stock = useStockContextSelector(({ stateRef }) => stateRef.current);
  const ids = useMemo(() => Object.keys(stock), [stock]);
  return (
    <ProductTableFastMemoed ids={ids} />
  );
}

function useRow(id: string) {
  const row = useStockContextSelector(({ stateRef }) => stateRef.current[id]);
  return row;
}

const ProductTableFastMemoed = memo(
  function ProductTableFastMemoed({ ids }: { ids: string[] }) {
    const increment = useStockContextSelector(({ increment }) => increment);
    const columns: TableColumn<Product>[] = [
      { name: "name", Cell: ({ row }) => <>{row.name}</> },
      {
        name: "quantity",
        Cell: function ({ row }) {
          const { id, quantity } = row;
          const label = `${row.name} quantity`;
          const onClick = () => increment({ id });
          return (
            <button aria-label={label} onClick={onClick}>
              {quantity}
            </button>
          );
        },
      },
    ];
    return <TableFast rowIds={ids} useRow={useRow} columns={columns} />;
  },
  ({ ids: prevIds }, { ids: nextIds }) =>
    prevIds.length === nextIds.length &&
    prevIds.every((id, i) => id === nextIds[i])
);

export default ProductTableWithContextProvider;
