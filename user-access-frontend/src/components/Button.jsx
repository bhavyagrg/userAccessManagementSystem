import "../styles/signup.css"

export const Button = ({value, type, disabled}) => {
    return (
        <button className="signup-button" type={type} disabled={disabled}>{value}</button>
    )
}