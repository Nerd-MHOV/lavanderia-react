
import "./home.scss"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured"
import Chart from "../../components/chart/Chart"
import Table from "../../components/table/Table"
import { Widgets } from "../../components/Widgets/Widgets";



const Home = () => {
  

  return (
    <div className="home">
      <Sidebar />
      <div className="homeBx">
        <Navbar />
        <Widgets />
        <div className="charts">
          <Featured className="percent" />
          <Chart title="Últimos 6 meses (retiradas)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Últimas retiradas</div>
          <Table />
        </div>
      </div>
    </div>
  );
}

export default Home
