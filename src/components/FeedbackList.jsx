// import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'

import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'

import FeedbackItem from './FeedbackItem'

const FeedbackList = () => {
  const { feedback } = useContext(FeedbackContext)

  if (!feedback || feedback.length === 0) {
    return <p>No feedback yet</p>
  }
  return (
    <div className='feedback-list'>
      <AnimatePresence>
        {feedback.map((feedbackItem) => (
          <motion.div
            key={feedbackItem.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FeedbackItem item={feedbackItem} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// FeedbackList.propTypes = {
//   feedback: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       text: PropTypes.string.isRequired,
//       rating: PropTypes.number.isRequired,
//     })
//   ),
// }

export default FeedbackList
