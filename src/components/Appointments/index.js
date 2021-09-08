// Write your code
import './index.css'
import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointments: [],
    title: '',
    date: '',
    showStarred: false,
  }

  onSubmitAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
    const newAppointment = {
      id: uuidv4(),
      title,
      date: formattedDate,
      isStarred: false,
    }
    if (title.trim() !== '' && formattedDate !== '') {
      this.setState(prevState => ({
        appointments: [...prevState.appointments, newAppointment],
        title: '',
        date: '',
      }))
    }
  }

  onChangeTitle = event => {
    const title = event.target.value
    this.setState({title})
  }

  onChangeDate = event => {
    const date = event.target.value
    this.setState({date})
  }

  CreateForm = () => {
    const {title, date} = this.state
    return (
      <div className="form-container">
        <div className="form-inputs-container">
          <h1 className="title">Add Appointment</h1>
          <form onSubmit={this.onSubmitAppointment}>
            <label className="label" htmlFor="appointmentTitle">
              Title
            </label>
            <br />
            <input
              id="appointmentTitle"
              value={title}
              type="text"
              placeholder="Title"
              className="appointment-input"
              onChange={this.onChangeTitle}
            />
            <label className="label" htmlFor="appointmentDate">
              Date
            </label>
            <br />
            <input
              id="appointmentDate"
              value={date}
              type="date"
              className="appointment-input"
              onChange={this.onChangeDate}
            />
            <div>
              <button type="submit" className="add-button">
                Add
              </button>
            </div>
          </form>
        </div>
        <img
          className="appointments-image"
          src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
          alt="appointments"
        />
      </div>
    )
  }

  getStarredAppointments = appointments =>
    appointments.filter(appointment => appointment.isStarred)

  onStarButtonClick = id => {
    this.setState(prevState => ({
      appointments: prevState.appointments.map(appointment =>
        id === appointment.id
          ? {...appointment, isStarred: !appointment.isStarred}
          : appointment,
      ),
    }))
  }

  Appointments = props => {
    const {filteredAppointments} = props
    return (
      <ul className="appointments-container">
        {filteredAppointments.map(appointment => (
          <AppointmentItem
            appointment={appointment}
            key={appointment.id}
            onStarButtonClick={this.onStarButtonClick}
          />
        ))}
      </ul>
    )
  }

  showStarred = () => {
    this.setState(prevState => ({
      showStarred: !prevState.showStarred,
    }))
  }

  render() {
    const {appointments, showStarred} = this.state
    const showStarredButtonClassNames = `show-starred-button ${
      showStarred ? 'active-show-starred-button' : ''
    }`
    const filteredAppointments = showStarred
      ? this.getStarredAppointments(appointments)
      : appointments
    return (
      <div className="bg-container">
        <div className="form-and-appointments-container">
          <this.CreateForm />
          <hr />
          <div className="row-container">
            <h1 className="heading">Appointments</h1>
            <button
              className={showStarredButtonClassNames}
              type="button"
              onClick={this.showStarred}
            >
              Starred
            </button>
          </div>
          <this.Appointments filteredAppointments={filteredAppointments} />
        </div>
      </div>
    )
  }
}

export default Appointments
