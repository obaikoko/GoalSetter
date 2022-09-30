import { useState } from 'react'
import { FaTrash, FaPen } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { deleteGoal, updateGoal } from '../features/goals/goalSlice'

function GoalItem({ goal }) {
  const [text, setText] = useState('')
  const dispatch = useDispatch()
  const update = () => {
    const goalId = goal._id
    dispatch(updateGoal(goal._id))
  }

  return (
    <div className="goal">
      <div>
        {new Date(goal.createdAt).toLocaleString('en-US')}
      </div>
      <h2>{goal.text}</h2>
      <button onClick={() => dispatch(deleteGoal(goal._id))} className="close"><FaTrash /></button>
      <button onClick={update} className="close edit"><FaPen /></button>
    </div>
  )
}

export default GoalItem