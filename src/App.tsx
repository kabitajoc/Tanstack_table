import "./App.css";
import ProductTable from "./components/ProductTable";

function App() {
  return (
    <div>
      <h1 className=" font-bold text-2xl mb-4 leading-8 tracking-wide">
        Product Table
      </h1>
      <ProductTable />
      {/* <Example /> */}
    </div>
  );
}

export default App;
