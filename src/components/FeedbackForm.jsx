import { useState, useContext, useEffect } from 'react'

import Cart from './global/Card'
import Button from './global/Button'

import RatingSelect from './RatingSelect'
import FeedbackContext from '../context/FeedbackContext'

const FeedbackForm = () => {
  const [text, setText] = useState('')
  const [rating, setRating] = useState(10)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')

  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext)

  useEffect(() => {
    if (feedbackEdit.edit) {
      setBtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    }
  }, [feedbackEdit])

  const handleTextChange = (event) => {
    if (text.length === 0) {
      setMessage(null)
      setBtnDisabled(true)
    } else if (text.trim().length <= 10) {
      setMessage('Text must be at least 10 characters')
      setBtnDisabled(true)
    } else {
      setMessage(null)
      setBtnDisabled(false)
    }

    setText(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (text.trim().length > 10) {
      const newFeedback = {
        text,
        rating,
      }

      if (feedbackEdit.edit) {
        updateFeedback(feedbackEdit.item.id, newFeedback)
      } else {
        addFeedback(newFeedback)
      }
      setText('')
    }
  }

  return (
    <Cart>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect
          select={(rating) => setRating(rating)}
          selected={rating}
        />
        <div className='input-group'>
          <input
            onChange={handleTextChange}
            type='text'
            placeholder='Write a review'
            value={text}
          />
          <Button type='submit' isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className='message'>{message}</div>}
      </form>
    </Cart>
  )
}

export default FeedbackForm
