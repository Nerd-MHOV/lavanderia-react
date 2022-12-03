
import "./style.scss"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Widgets } from "../../components/Widgets/Widgets";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import { useApi } from "../../hooks/api";

const columns = [
  { field: 'finality', headerName: 'Finalidade', width: 100 },
  { field: 'collaborator', headerName: 'Colaborador', width: 650 },
  { field: 'department', headerName: 'Departamento', width: 100 },
  { field: 'type', headerName: 'Tipo', width: 150 },
  { field: 'product', headerName: 'Produto', width: 180 },
  { field: 'service', headerName: 'Oficio', width: 200 },
  { field: 'size', headerName: 'Tamanho', width: 80 },
  { field: 'amountHas', headerName: 'Qnt Ret', width: 20 },
  { field: 'amountBack', headerName: 'Qnt Dev', width: 20 },
  { field: 'dateGo', headerName: 'Retirado', width: 120 },
  { field: 'dateBack', headerName: 'Devolvido', width: 120 },

];

const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];


const PanelReturn = () => {

  const api = useApi();
  const [rows, setRows] = useState([]);




  const getData = async () => {
    const api_response = await api.findReturn();
    makeLines(api_response)
    console.log(api_response)
  }

  const makeLines = async (data) => {
    const arrLines = await data.map(el => {
      let dateWhenGo = new Date(el.date_in)
      let dateWhenBack = new Date(el.date_out)

      return {
        id: el.id,
        type: el.product.type.type,
        product: el.product.product,
        service: el.product.service.service,
        size: el.product.size,
        amountHas: el.amount_has,
        amountBack: el.amount,
        finality: el.collaborator_id ? 'Colaborador' : 'Setor',
        collaborator: el.responsible_in.collaborator + ' / ' + el.responsible_out.collaborator,
        department: el.responsible_in.department.department,
        dateGo: ((dateWhenGo.getDate() + " " + meses[(dateWhenGo.getMonth())] + " " + dateWhenGo.getFullYear())),
        dateBack: ((dateWhenBack.getDate() + " " + meses[(dateWhenBack.getMonth())] + " " + dateWhenBack.getFullYear()))
      }
    })

    setRows(arrLines);
  }
  useEffect(() => {
    getData()
  }, [])  

  return (
    <div className="home">
      <Sidebar />
      <div className="homeBx">
        <Navbar />
        <Widgets />
        
        <div className="p20">
          <div className="containerBx">
            <div style={{ width: '100%', height: '73vh' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                // autoHeight
                checkboxSelection
                components={{
                  Toolbar: GridToolbar,
                }}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default PanelReturn
