import React, { useEffect } from 'react'
import {getTickets,reset} from "../features/tickets/ticketSlice"
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import TicketItem from '../components/TicketItem'

function Tickets() {

const {tickets, isLoading, isSuccess} = useSelector((state) => state.tickets)

const dispatch = useDispatch()

useEffect(() => {
    return () => {
        if(isSuccess) {
            dispatch(reset())
        }
    }
}, [dispatch,isSuccess])

useEffect(() => {
    dispatch(getTickets())
},[dispatch])

if(isLoading) {
    return <Spinner/>
}

  return (
    <div>
        <BackButton/>
      <h1>ticket</h1>
      <div className="tickets">
        <div className="ticket-headings">
            <div>Date</div>
            <div>Products</div>
            <div>Status</div>
            <div></div>
        </div>
       {tickets.map((ticket) => (
        <TicketItem key={ticket._id} ticket={ticket}/>
       ))}
      </div>
    </div>
  )
}

export default Tickets
