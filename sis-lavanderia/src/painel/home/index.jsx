
//import "./home.scss"
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

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
