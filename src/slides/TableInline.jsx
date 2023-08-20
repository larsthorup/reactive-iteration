function Products() {
  const stock = useSelector((state) => state.stock);
  const ids = Object.keys(stock);
  return (
    <table>
      <tbody>
        {ids.map((id) => (
          <ProductRow key={id} id={id} />
        ))}
      </tbody>
    </table>
  );
}

function ProductRow({id}: {id: string}) {
  const product = useSelector((state) => state.stock[id]);
  const { quantity, name } = product;
  const dispatch = useDispatch();
  const onClick = () => dispatch(increment({ id }));
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

