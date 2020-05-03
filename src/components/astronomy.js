import React, { useState, useEffect } from "react"
import DatePicker from "react-datepicker"
import axios from "axios"
import { format } from "date-fns"
import "./astronomy.css"
import "react-datepicker/dist/react-datepicker.css"

export default function Astronomy() {
  const [copyright, setCopyright] = useState("")
  const [date, setDate] = useState("")
  const [explanation, setExplanation] = useState("")
  const [title, setTitle] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [startDate, setStartDate] = useState(new Date())
  const searchDate = format(startDate, "yyyy-MM-dd")

  const printDate = date => date.split("-").reverse().join("-")

  useEffect(() => {
    const fetchImage = async () => {
      const result = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=TrOS4UtSVKBOtq0fzZL5PBrjUdtB4oDbgt5DFDdc&date=${searchDate}`
      )
      const { copyright, date, explanation, title, url } = result.data

      setCopyright(copyright)
      setDate(date)
      setExplanation(explanation)
      setTitle(title)
      setImageUrl(url)
    }
    fetchImage()
  }, [copyright, date, explanation, title, imageUrl, startDate, searchDate])

  return (
    <div className="Astronomy">
      <div className="DatePicker">
        <h3 className="DatePicker-title">Choose a date</h3>
        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={startDate}
          onChange={date => setStartDate(date)}
          customInput={<DatePickerInput />}
        />
      </div>
      <h2>The image for {printDate(date)} is</h2>
      <h3>{title}</h3>
      <img src={imageUrl} alt={title} />
      <h4>
        <span>{copyright}</span>
        {` `}
        <span>{printDate(date)}</span>
      </h4>
      <p>{explanation}</p>
    </div>
  )
}

const DatePickerInput = ({ value, onClick }) => (
  <button className="datepicker-input-btn" onClick={onClick}>
    {value}
  </button>
)
