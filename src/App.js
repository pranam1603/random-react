import React, { useState, useEffect } from 'react'
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'
const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'
function App() {
  const [loading, setLoading] = useState(false);
  const [person, setPerson] = useState(null)
  const [title, setTitle] = useState('name')
  const [value, setValue] = useState('Random Name')
  const handleValue = (e) => {
    if (e.target.classList.contains('icon')) {
      const newValue = e.target.dataset.label;
      setTitle(`${newValue}`)
      setValue(`${person[newValue]}`)
    }
  }

  const fetchPerson = async () => {
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json()
    const people = data.results[0];
    const { email, phone } = people;
    const { dob: { age } } = people;
    const { street: { number, name } } = people.location;
    const { login: { password } } = people;
    const { first, last } = people.name;
    const { large: image } = people.picture;
    const newPerson = { email, phone, age, password, image, street: `${number} ${name}`, name: `${first} ${last}` }
    setPerson(newPerson);
    setTitle('name')
    setValue(newPerson.name)
    setLoading(false)
  }

  useEffect(() => {
    fetchPerson()
  }, [])

  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img src={(person && person.image) || defaultImage} alt="" className="user-img" />
          <p className="user-title">my {title} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button className="icon" data-label="name" onMouseOver={handleValue}>
              <FaUser />
            </button>
            <button className="icon" data-label="email" onMouseOver={handleValue}>
              <FaEnvelopeOpen />
            </button>
            <button className="icon" data-label="age" onMouseOver={handleValue}>
              <FaCalendarTimes />
            </button>
            <button className="icon" data-label="street" onMouseOver={handleValue}>
              <FaMap />
            </button>
            <button className="icon" data-label="phone" onMouseOver={handleValue}>
              <FaPhone />
            </button>
            <button className="icon" data-label="password" onMouseOver={handleValue}>
              <FaLock />
            </button>
          </div>
          <button className="btn" type="button" onClick={fetchPerson}>
            {loading ? "loading..." : "Random user"}
          </button>
        </div>
      </div>
    </main>
  )
}

export default App
