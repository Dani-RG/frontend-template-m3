import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

export default function AnimalCardDetail({ animal, handleAnimal }) {
  const { isLoggedIn, user } = useContext(AuthContext); 
  const {
    _id,
    common_name,
    scientific_name,
    class_name,
    family_name,
    habitat_type,
    population,
    species_status,
    image,
    database_link
  } = animal

    const handleSelectAnimal = () => {
    handleAnimal(_id)
  }
  
  return (
    <div className='animal_card detail'>
      <div>
        <img src={image} className='animal_image' alt={common_name} />
      </div>
      <div className='card_details'>

        <div className='details_text'>
          <p>Population:</p>
          <br></br>
          <p>Name:</p>
          <p className='bolder_text'>{common_name}</p>
          <p>Scientific name:</p>
          <p className='bolder_text'>{scientific_name}</p>
          <p>Status:</p>
          <p className='bolder_text'>{species_status}</p>
          <p>Class:</p>
          <p className='bolder_text'>{class_name}</p>
          <p>Family:</p>
          <p className='bolder_text'>{family_name}</p>
          <p>Habitat:</p>
          <p className='bolder_text'>{habitat_type}</p>
          <a href={database_link} target='_blank' rel='noopener noreferrer' className='link'>See web data</a>
        </div>

        <div className='details_text'>
          <p className='animal_population bigger_text'>{population.toLocaleString('it-IT')}</p>
        </div>

      </div>

      <div className='center'>
        <button className='green_btn'>
          {isLoggedIn ? <Link to={'/projects/selection'} onClick={handleSelectAnimal} animal={_id} className='bolder_text'>Donate</Link> : <Link to={'/login'}>Donate</Link>}
        </button>
        <div>
          {isLoggedIn && user.role === 'admin' && <button><Link to={`/animals/edit/${_id}`} className='btn wider'>Edit</Link></button>}
        </div>
      </div>


    </div>
  )
}
