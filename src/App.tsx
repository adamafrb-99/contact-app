import { useRoutes } from 'react-router-dom';
import { routes } from './router';

function App() {
  const appRoutes = useRoutes(routes);

  return <div className="px-3 py-1 lg:px-64">{appRoutes}</div>;
}

export default App;
