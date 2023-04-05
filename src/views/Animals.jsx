import React, { useState, useEffect } from 'react';
import AnimalCardResume from '../components/AnimalCardResume';
import animalService from '../services/animalService';
import SearchInput from '../components/SearchInput';

export default function Home() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  const getAnimals = async () => {
    try {
      const response = await animalService.getAnimals();
      setAnimals(response)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAnimals()
  }, [])

  const handleSearch = (value) => {
    setSearchValue(value);
  }

  const handleFilter_LC = () => {
    const filteredAnimals = animals.filter(elem => elem.species_status === 'Least Concern');
    setAnimals(filteredAnimals);
  }
  const handleFilter_NT = () => {
    const filteredAnimals = animals.filter(elem => elem.species_status === 'Near Threatened');
    setAnimals(filteredAnimals);
  }
  const handleFilter_V = () => {
    const filteredAnimals = animals.filter(elem => elem.species_status === 'Vulnerable');
    setAnimals(filteredAnimals);
  }
  const handleFilter_En = () => {
    const filteredAnimals = animals.filter(elem => elem.species_status === 'Endangered');
    setAnimals(filteredAnimals);
  }
  const handleFilter_CE = () => {
    const filteredAnimals = animals.filter(elem => elem.species_status === 'Critically Endangered');
    setAnimals(filteredAnimals);
  }
  const handleFilter_ExW = () => {
    const filteredAnimals = animals.filter(elem => elem.species_status === 'Extinct in the Wild');
    setAnimals(filteredAnimals);
  }

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading &&
        (<div className="app">
          <div className="action_container">
            <button className="btn_filter" onClick={handleFilter_LC}>Least Concern</button>
            <button className="btn_filter" onClick={handleFilter_NT}>Near Threatened</button>
            <button className="btn_filter" onClick={handleFilter_V}>Vulnerable</button>
            <button className="btn_filter" onClick={handleFilter_En}>Endangered</button>
            <button className="btn_filter" onClick={handleFilter_CE}>Critically Endangered</button>
            <button className="btn_filter" onClick={handleFilter_ExW}>Extinct in the Wild</button>
          </div>
          <div className="search_container">
              <SearchInput handleSearchValue={handleSearch} />
          </div>
          <div className="card_container">
            {animals.filter(elem => elem.common_name.toLowerCase().includes(searchValue.toLowerCase()) || elem.scientific_name.toLowerCase().includes(searchValue.toLowerCase()) || elem.class_name.toLowerCase().includes(searchValue.toLowerCase()))
              .map(elem => {
                return <AnimalCardResume key={elem._id} animal={elem} />
              })} 
          </div>
        </div>)}
    </>
  )
}
