import CustomRouter from "./pages/Router";
import styles from './app.module.css';

function App() {
  return (
    <div className={styles.app}>
      <CustomRouter />
    </div>
  );
}

export default App;
