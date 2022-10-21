import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import TableMinimizable from "../../../components/TableMinimizable";
import "./style.scss";
import Btn from "../../../components/btn/Btn"

//Padrão tabela
function createData(name, department, lastRetreat, products ) {
    return {
      name,
      department,
      lastRetreat,
      products,
    };
  }


const rowsHeader = [
    createData('Felipe Alberto', 'Monitoria', '15/08 14:00',[
        {
            id: 1,
            dateRetreat: '15/08 13:40',
            type:'calça',
            product:'verde',
            service:'Peraltas',
            size: 'G',
            returnProduct: <Btn color="blue" action="Devolver"/>,
        },
    ]),
    createData('Jean Rodrigues', 'Portaria', '15/08 14:00', [
        {
            id: 1,
            dateRetreat: '15/08 13:40',
            type:'calça',
            product:'verde',
            service:'Peraltas',
            size: 'G',
            returnProduct: <Btn color="blue" action="Devolver"/>,
        },
        {
            id: 2,
            dateRetreat: '15/08 13:40',
            type:'calça',
            product:'amarelo',
            service:'Peraltas',
            size: 'G',
            returnProduct: <Btn color="blue" action="Devolver"/>,
        }
    ]),
    createData('Matheus Henrique', 'T.I.', '15/08 14:00', [
        {
            id: 1,
            dateRetreat: '15/08 13:40',
            type:'calça',
            product:'verde',
            service:'Peraltas',
            size: 'G',
            returnProduct: <Btn color="blue" action="Devolver"/>,
        }
    ]),
    createData('-', 'T.I.', '15/08 14:00', [
        {
            id: 1,
            dateRetreat: '15/08 13:40',
            type:'calça',
            product:'verde',
            service:'Peraltas',
            size: 'G',
            returnProduct: <Btn color="blue" action="Devolver"/>,
        }
    ]),
];
const titleHeader = ["NOME", "DEPARTAMENTO", "ÚLTIMA RETIRADA"];
const titleBody = ["Data", "Tipo", "Produto", "Oficio", "Tamanho", "Devolver"];


export const ReturnProduct = () => {
    return(
        <div className="returnProduct">
            <Sidebar />
            <div className="returnProductBx">
                <Navbar />
                <div className="p20">
                    <div className="containerBx">

                        <div className="titleContainerBx">Por Colaborador</div>
                        <hr className="hrTitleBx" />
                        <TableMinimizable
                            rowsHeader={rowsHeader}
                            titleHeader={titleHeader}
                            titleBody={titleBody}
                        />
                    </div>

                    <div className="containerBx mt20">

                        <div className="titleContainerBx">Por Departamento</div>
                        <hr className="hrTitleBx" />
                        <TableMinimizable
                            rowsHeader={rowsHeader}
                            titleHeader={titleHeader}
                            titleBody={titleBody}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
