import "./btn.scss"

const Btn = ({color, action, onClick = function(){return null} }) => {
    return (
        <button onClick={onClick} className={`btn ${color}`}>{action}</button>
    )
}

export default Btn