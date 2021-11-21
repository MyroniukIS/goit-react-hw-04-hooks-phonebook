import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import { v4 } from 'uuid';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';
import phonebook from './img/icon.png';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setContacts(JSON.parse(window.localStorage.getItem('contacts')) ?? []);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const contact = {
      id: v4(),
      name,
      number,
    };
    contacts.map(contact => contact.name).includes(name)
      ? alert(`Inputed ${name} is already in the contacts`)
      : setContacts([...contacts, contact]);
  };

  const handleFilterContacts = e => {
    return setFilter(e.currentTarget.value);
  };

  const getFilteredContacts = () => {
    return contacts.filter(({ name }) => name.toLowerCase().includes(filter));
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  return (
    <div className="main_container">
      <div className="main_title_container">
        <img className="main_title_img" src={phonebook} alt="phonebook-icon" />
        <h1 className="main_title">Phonebook</h1>
      </div>

      <ContactForm onSubmit={addContact} />

      <h2 className="title">Contacts</h2>
      <Filter filter={filter} onFilterChange={handleFilterContacts} />
      <ContactList
        contacts={getFilteredContacts()}
        handleDelete={deleteContact}
      />
    </div>
  );
}
