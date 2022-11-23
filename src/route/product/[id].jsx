export default function ProductPage({ id, props }) {
  console.log(props);
  return (
    <div>
      <h1>PRODUCT PAGE</h1>
      <p>{id}</p>
    </div>
  );
}
