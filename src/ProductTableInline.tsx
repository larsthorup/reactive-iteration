import { memo, useMemo } from "react";
import { increment, useAppDispatch, useAppSelector } from "./store";

function ProductTableInline() {
  const stock = useAppSelector((state) => state.stock);
  const ids = useMemo(() => Object.keys(stock), [stock]);
  return <ProductTableInlineMemoed ids={ids} />;
}

const ProductTableInlineMemoed = memo(function ProductTableInlineMemoed({ids}: {ids: string[]}) {
  return (
    <table>
      <tbody>
        {ids.map((id) => (
          <ProductTableInlineRow key={id} id={id} />
        ))}
      </tbody>
    </table>
  );
}, ({ids: prevIds}, {ids: nextIds}) => prevIds.length === nextIds.length && prevIds.every((id, i) => id === nextIds[i]));

function ProductTableInlineRow({
  id,
}: {id: string}) {
  const row = useAppSelector((state) => state.stock[id]);
  const { quantity, name } = row;
  const dispatch = useAppDispatch();
  const onClick = () => { 
    dispatch(increment({ id }));
  };
  return (
    <tr>
        <td>
          {name}
        </td>
        <td>
          <button onClick={onClick}>{quantity}</button>
        </td>
    </tr>
  );
}

export default ProductTableInline;