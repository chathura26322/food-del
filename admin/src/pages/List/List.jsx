import  { useEffect, useState } from 'react'
import './List.css'
import { url } from '../../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {

  const [list,setList] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editData, setEditData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Rice'
  });
  const [newImage, setNewImage] = useState(null);
  
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    if(response.data.success)
    {
      setList(response.data.data);
    }
    else{
      toast.error("Error")
    }
  }

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`,{
      id:foodId
    })
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    }
    else {
      toast.error("Error")
    }
  }

  const openEditModal = (item) => {
    setEditingItem(item);
    setEditData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category
    });
    setNewImage(null);
    setShowEditModal(true);
  }

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingItem(null);
    setNewImage(null);
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  }

  const handleUpdateFood = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('id', editingItem._id);
    formData.append('name', editData.name);
    formData.append('description', editData.description);
    formData.append('price', Number(editData.price));
    formData.append('category', editData.category);
    
    if (newImage) {
      formData.append('image', newImage);
    }

    try {
      const response = await axios.post(`${url}/api/food/update`, formData);
      if (response.data.success) {
        toast.success(response.data.message);
        closeEditModal();
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error updating food");
    }
  }

  useEffect(()=>{
    fetchList();
  },[])

  return (
    <div className='list add flex-col'>
        <p>All Foods List</p>
        <div className='list-table'>
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {list.map((item,index)=>{
            return (
              <div key={index} className='list-table-format'>
                <img src={`${url}/images/`+item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <div className='list-actions'>
                  <button className='edit-btn' onClick={() => openEditModal(item)} title='Edit'>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <p className='delete-btn' onClick={()=>removeFood(item._id)} title='Delete'>×</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Edit Modal */}
        {showEditModal && (
          <div className='modal-overlay' onClick={closeEditModal}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
              <div className='modal-header'>
                <h2>Edit Food Item</h2>
                <button className='close-btn' onClick={closeEditModal}>&times;</button>
              </div>
              
              <form className='edit-form' onSubmit={handleUpdateFood}>
                <div className='form-group'>
                  <label>Product Name</label>
                  <input
                    type='text'
                    name='name'
                    value={editData.name}
                    onChange={handleEditChange}
                    required
                  />
                </div>

                <div className='form-group'>
                  <label>Product Description</label>
                  <textarea
                    name='description'
                    value={editData.description}
                    onChange={handleEditChange}
                    required
                  />
                </div>

                <div className='form-group'>
                  <label>Category</label>
                  <select name='category' value={editData.category} onChange={handleEditChange}>
                    <option value="Rice">Rice</option>
                    <option value="Fast Food">Fast Food</option>
                    <option value="Deserts">Deserts</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Cake">Cake</option>
                    <option value="Pure Veg">Pure Veg</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodles">Noodles</option>
                    <option value="Salad">Salad</option>
                  </select>
                </div>

                <div className='form-group'>
                  <label>Price</label>
                  <input
                    type='number'
                    name='price'
                    value={editData.price}
                    onChange={handleEditChange}
                    required
                  />
                </div>

                <div className='form-group'>
                  <label>Update Image (Optional)</label>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={(e) => setNewImage(e.target.files[0])}
                  />
                  {newImage ? (
                    <img src={URL.createObjectURL(newImage)} alt="Preview" className='image-preview' />
                  ) : (
                    <img src={`${url}/images/${editingItem.image}`} alt="Current" className='image-preview' />
                  )}
                </div>

                <div className='form-actions'>
                  <button type='button' className='cancel-btn' onClick={closeEditModal}>Cancel</button>
                  <button type='submit' className='submit-btn'>Update</button>
                </div>
              </form>
            </div>
          </div>
        )}
    </div>
  )
}

export default List
