import "./list.scss"
import Sidebar from "../../componets/sidebar/Sidebar"
import Navbar from "../../componets/navbar/Navbar"
import Datatable from "../../componets/datatable/Datatable"

const List =  () => {
    return(
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <Datatable />
            </div>
        </div>
    )
}

export default List