import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react'
import GoalForm from "../GoalForm";
import {getGoals,reset} from '../../features/goals/goalSlice'
import Spinner from '../../components/Spinner'
import GoalItem from '../GoalItem'


function Dashboard() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)
  const {goals, isLoading,  isError, message} = useSelector(state => state.goals)

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate('/login')
      dispatch(reset())
    } else {
      dispatch(getGoals())
    }

    
  }, [user, message, isError, navigate, dispatch])

  if (isLoading) {
    return <Spinner/>
  }
  return (
    <>
      <section>
        <h1>Welcome {user && user.name}</h1>
        <p>Goal Dashbord</p>
      </section>
      <GoalForm/>

      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map(goal => (<GoalItem key={goal._id} goal={goal}/>)
              )} 
          </div>
        ) : (<h3>You are yet to set a Goal</h3>)}
      </section>
    </>
  )
}

export default Dashboard