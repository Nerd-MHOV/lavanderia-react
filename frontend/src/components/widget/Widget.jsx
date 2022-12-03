import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material"
import { useNavigate } from "react-router-dom";
import "./widget.scss"

const Widget = ({ data, navigateUrl }) => {

    const navigate = useNavigate();

    function handleNavigate() {
        navigate(navigateUrl)
    }

    return (
        <div className="widget" onClick={handleNavigate}>
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">{data.amount}</span>
                <span className="link">{data.link}</span>
            </div>
            <div className="right">
                <div className={`percentage ${data.positive ? 'positive' : 'negative'}`}>
                    {
                        data.positive 
                        ? <KeyboardArrowUp />
                        : <KeyboardArrowDown />
                    }
                    {/* {diff}% */}
                </div>
                {data.icon}
            </div>
        </div>
    )
}

export default Widget


