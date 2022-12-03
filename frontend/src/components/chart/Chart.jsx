import './chart.scss'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useApi } from '../../hooks/api';
import { useEffect, useState } from 'react';

const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]


const day = new Date();
const monthToday = day.getMonth();
console.log(monthToday, "monthToday")


const Chart = ({aspect, title}) => {

    const api = useApi();
    const [dataTables, setDataTables] = useState([]);

    
    function filterForMonth(monthOutput, arr) {
        let forMonth = arr.filter(arr => {
            let dateUpdatedAt = new Date(arr.updatedAt)
            return dateUpdatedAt.getMonth() === monthOutput
        })
        let some = 0;
        forMonth.map((arr) => {
            some = arr.amount + some
        })
        return some

    }


    async function getOutputs() {
        await api.findOutputLog().then( response =>  {
            console.log(response, 'getOutputs')
            let monthOne = filterForMonth((monthToday - 5), response)
            let monthTwo = filterForMonth((monthToday - 4), response)
            let monthThree = filterForMonth((monthToday - 3), response)
            let monthFour = filterForMonth((monthToday - 2), response)
            let monthFive = filterForMonth((monthToday - 1), response)
            let monthSix = filterForMonth((monthToday), response)
            
            setDataTables([
                { name: months[(monthToday - 5)], Total: monthOne },
                { name: months[(monthToday - 4)], Total: monthTwo},
                { name: months[(monthToday - 3)], Total: monthThree },
                { name: months[(monthToday - 2)], Total: monthFour },
                { name: months[(monthToday - 1)], Total: monthFive },
                { name: months[(monthToday)], Total: monthSix}
            ])

        }).catch( err => console.log(err))
    }

    useEffect(() => {
        getOutputs()
    }, [])

    return (
        <div className='chart'>
            <div className="title">{title}</div>
            <ResponsiveContainer width="100%" maxHeight={400} aspect={aspect}>
                <AreaChart width={730} height={250} data={dataTables}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="Total" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ff4f1580" stopOpacity={0.5} />
                            <stop offset="95%" stopColor="#ff4f1580" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke='gray' />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" className='chartGrid' />
                    <Tooltip />
                    <Area type="monotone" dataKey="Total" stroke="#ff4f1580" fillOpacity={1} fill="url(#Total)" />
                </AreaChart>
            </ResponsiveContainer>

        </div>
    )
}

export default Chart