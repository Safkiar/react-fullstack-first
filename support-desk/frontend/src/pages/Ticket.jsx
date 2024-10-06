import React, { useEffect } from 'react'
import {closeTicket, getTicket} from '../features/tickets/ticketSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function Ticket() {
  const {ticket, isLoading, isError, message} = useSelector((state) => state.tickets)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {ticketId} = useParams()

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    dispatch(getTicket(ticketId))
    // eslint-disable-next-line
  }, [isError, message, ticketId])


  const onTicketClose = () => {
    dispatch(closeTicket(ticketId))
    toast.success('Ticket Closed')
    navigate('/tickets')
  }

  if(isLoading) {
    return <Spinner/>
  }

  if(isError) {
    return <h3>Something Went Wrong</h3>
  }


  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton url='/tickets'/>
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
        <h3>Issue with: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
      </header>

      {ticket.status !== 'closed' && (
        <button className="btn btn-block btn-danger" onClick={onTicketClose}>Close Ticket</button>
      )} 

    </div>
  )
}

export default Ticket
