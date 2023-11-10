import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ItemForm from '../components/ItemForm'
import ItemItem from '../components/ItemItem'
import Spinner from '../components/Spinner'
import { getItems, reset } from '../features/items/itemSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { items, isLoading, isError, message } = useSelector(
    (state) => state.items
  )

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = user?.token;
        if (token) {
          await dispatch(getItems());
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    if (isError) {
      console.log(message)
    }

    if (!user || Object.keys(user).length === 0) {
      console.log('Redirecting to login...');
      navigate('/login');
      return;
    }

    // console.log(fetchItems());
    fetchItems();

    dispatch(getItems)

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Items Dashboard</p>
      </section>

      <ItemForm />

      <section className='content'>
        {items.length > 0 ? (
          <div className='items'>
            {items.map((item) => (
              <ItemItem key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <h3>You have not set any items</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard