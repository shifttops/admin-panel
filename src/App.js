import { CookiesProvider } from "react-cookie";
import CustomRouter from "./pages/Router";

function App() {
  return (
    <CookiesProvider>
      <CustomRouter />
    </CookiesProvider>
  );
}

export default App;
