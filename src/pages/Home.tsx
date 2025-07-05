import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col bg-linear-to-b from-black from-80% to-blue-700">
      <div className="flex-0.2">
        <Header />
      </div>

      <div className="flex-0.8 h-full flex flex-col items-center justify-center">
        <div className="w-full text-center space-y-3.5">
          <h1 className="text-5xl">One Wallet. Two Worlds.</h1>
          <h2 className="text-5xl"> Ethereum & Solana in One Place.</h2>
          <p className="text-xl mt-16">Start now with one of the chains</p>
        </div>

        <div className="space-x-3.5 mt-7">
          <button className="w-3xs py-3 bg-linear-to-r from-green-300 via-green-400 to-green-600 rounded-4xl font-bold text-black cursor-pointer transition hover:scale-105">
            Ethereum
          </button>
          <button
            onClick={() => {
              navigate("/wallet");
            }}
            className="w-3xs py-3 bg-linear-to-r from-blue-300 via-blue-400 to-blue-600 rounded-4xl font-bold text-black cursor-pointer transition hover:scale-105"
          >
            Solana
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
