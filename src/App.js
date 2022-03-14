import AppRouter from "./AppRouter";
import { useSelector } from "react-redux";

function App() {
  const count = useSelector((state) => state.auth);
  console.log(count);
  return <AppRouter />;
}

export default App;
