
import "./home.scss"
import Sidebar from "../../componets/sidebar/Sidebar";
import Navbar from "../../componets/navbar/Navbar";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeBx">
        <Navbar />
        home
      </div>
    </div>
  );
}

export default Home
