import { useState,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {createGoal} from '../features/goals/goalSlice'
import {toast} from 'react-toastify'

function GoalForm() {
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const { isError, message} = useSelector(state => state.goals)

    useEffect(() => {
        if (isError) {
            toast(message) 
        }
    }, [message, isError])
    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(createGoal({text})) 
        setText('')
    }
    return (
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text">Goal</label>
                    <input
                        type="text"
                        name='text'
                        id='text'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                         />
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type='submit'>Add Goal</button>
                </div>
            </form>
        </section>
    )
}

export default GoalForm 