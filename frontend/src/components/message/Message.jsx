import "./message.scss"

const Message = ({type, message}) => {
    return (
        <div className="message">
            <div className={`messageBx ${type}`}>{message}</div>
        </div>
    )
}

export default Message