import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./pages/Home";
import Wallet from "./pages/Wallet";
function App() {
  return <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />}/>
        <Route path="/wallet" element={<Wallet />}/>

      </Routes>
  
  </BrowserRouter>;
}

export default App;
