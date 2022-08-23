import "./btn.scss"

const Btn = ({color, action}) => {
    return (
        <button className={`btn ${color}`}>{action}</button>
    )
}

export default Btn