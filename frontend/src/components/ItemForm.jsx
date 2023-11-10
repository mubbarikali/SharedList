import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createItem } from '../features/items/itemSlice'

function ItemForm() {
  const [itemName, setItemName] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createItem({ itemName }))
    setItemName('')
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='itemName'>Item</label>
          <input
            type='text'
            name='itemName'
            id='itemName'
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Item
          </button>
        </div>
      </form>
    </section>
  )
}

export default ItemForm