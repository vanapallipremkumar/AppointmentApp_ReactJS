// Write your code here
import './index.css'
// <li>{appointment.title}</li>
const AppointmentItem = props => {
  const {appointment, onStarButtonClick} = props
  const {id, title, date, isStarred} = appointment
  const starImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onStarClickFunction = () => {
    onStarButtonClick(id)
  }

  return (
    <li className="appointment-container">
      <div className="title-starimage-container">
        <p className="appointment-title">{title}</p>
        <button
          type="button"
          className="star-button"
          onClick={onStarClickFunction}
          testid="star"
        >
          <img src={starImage} alt="star" />
        </button>
      </div>
      <p className="appointment-date">{date}</p>
    </li>
  )
}

export default AppointmentItem
