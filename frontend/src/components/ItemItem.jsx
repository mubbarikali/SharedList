import { useDispatch } from 'react-redux'
import { deleteItem } from '../features/items/itemSlice'

function ItemItem({ item }) {
  const dispatch = useDispatch()

  return (
    <div className='item'>
      <h2>{item.itemName}</h2>
      <div>{new Date(item.createdAt).toLocaleString('en-US')}</div>
      <button onClick={() => dispatch(deleteItem(item._id))} className='close'>
        X
      </button>
    </div>
  )
}

export default ItemItem