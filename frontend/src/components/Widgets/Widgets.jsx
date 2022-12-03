import Widget from '../widget/Widget';
import { AssignmentTurnedIn, Checkroom, PersonOutline, ShoppingBag } from "@mui/icons-material"
import { useApi } from "../../hooks/api";
import { useEffect, useState } from "react";

import './style.scss';

let today = new Date();
let threeDay = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() - 3}`
today = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`

export const Widgets = () => {

  const api = useApi();
  const [amountRetreat, setAmountRetreat] = useState(0);
  const [amountReturned, setAmountReturned] = useState(0)
  const [amountPendency, setAmountPendency] = useState(0)
  const [amountWinners, setAmountWinners] = useState(0)

  async function getAmountRetreat() {
    await api.findOutputLog().then(response => {

      let filRetreat = response.filter((arr) => arr.updatedAt > today)
      setAmountRetreat(filRetreat.length)
    }).catch(err => console.log(err))
  }

  async function getAmountReturned() {
    await api.findReturn().then(response => {
      let filReturned = response.filter(arr => arr.date_out > today)
      setAmountReturned(filReturned.length)
    })
  }

  async function getAmountPendency() {
    await api.findOutput().then(response => {
      setAmountPendency(response.length)
      let filWinners = response.filter(arr => arr.updatedAt > threeDay)
      setAmountWinners(filWinners.length)
    }).catch((err) => console.log('err', err))
  }




  const data = {
    dataRetreat: {
      positive: false,
      amount: amountRetreat,
      title: "RETIRADAS",
      link: "Ver todas",
      icon: <ShoppingBag className="icon" style={{ color: "#ff4f15", backgroundColor: "#ff4f1520" }} />,
    },


    dataReturn: {
      positive: true,
      amount: amountReturned,
      title: "DEVOLVIDAS",
      link: "Ver todas",
      icon: <AssignmentTurnedIn className="icon" style={{ color: "green", backgroundColor: "rgba(0,128,0,0.2)" }} />,
    },

    dataPendency: {
      positive: true,
      amount: amountPendency,
      title: "PENDENCIAS",
      link: "Ver todas",
      icon: <Checkroom className="icon" style={{ color: "goldenrod", backgroundColor: "rgba(218,165,32,0.2)" }} />,
    },

    dataExpired: {
      positive: false,
      amount: amountWinners,
      title: "VENCIDAS",
      link: "Ver todas",
      icon: <PersonOutline className="icon" style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)" }} />,
    }
  }


  useEffect(() => {
    getAmountRetreat()
    getAmountReturned()
    getAmountPendency()
  }, [])

  return (
    <div className="widgets">
      <Widget data={data.dataRetreat} navigateUrl="/painel/home/retiradas"/>
      <Widget data={data.dataReturn} navigateUrl="/painel/home/devolvidas"/>
      <Widget data={data.dataPendency} navigateUrl="/painel/home/pendencias"/>
      <Widget data={data.dataExpired} navigateUrl="/painel/home/vencidas"/>
    </div>
  )
}