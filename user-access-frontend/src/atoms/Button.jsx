import "../styles/button.css"

export const Button = ({value, type}) => {
    return (
        <button className="custom-btn" type={type}>{value}</button>
    )
}