import CustomRouter from "./pages/Router";
import styles from './app.module.scss';

function App() {
  return (
    <div className={styles.container}>
				<CustomRouter />
    </div>
  );
}

export default App;
