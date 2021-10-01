import { CookiesProvider } from "react-cookie";
import CustomRouter from "./pages/Router";
require('dotenv').config();

function App() {
  return (
    <CookiesProvider>
      <CustomRouter />
    </CookiesProvider>
  );
}

export default App;
