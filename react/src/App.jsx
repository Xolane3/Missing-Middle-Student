import { RouterProvider } from "react-router-dom";
import './index.css'; 
import { router } from "./router";
import 'bootstrap/dist/css/bootstrap.min.css';


<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  rel="stylesheet"
/>


function App() {
  return <RouterProvider router={router} />;
}

export default App;
