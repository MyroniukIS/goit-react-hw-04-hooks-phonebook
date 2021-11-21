import React, { Component } from 'react';
import './App.css';
import { v4 } from 'uuid';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const addContactsToLS = JSON.parse(localStorage.getItem('contacts'));

    if (addContactsToLS) {
      this.setState({ contacts: addContactsToLS });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (name, number) => {
    const { contacts } = this.state;
    const contact = {
      id: v4(),
      name,
      number,
    };
    contacts.map(contact => contact.name).includes(name)
      ? alert(`Inputed ${name} is already in the contacts`)
      : this.setState({ contacts: [contact, ...contacts] });
  };

  handleFilterContacts = e => {
    return this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normaziledFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normaziledFilter),
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;
    const filtredContacts = this.getFilteredContacts();
    return (
      <div className="main_container">
        <h1 className="main_title">Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2 className="title">Contacts</h2>
        <Filter filter={filter} onFilterChange={this.handleFilterContacts} />
        <ContactList
          contacts={filtredContacts}
          handleDelete={this.deleteContact}
        />
      </div>
    );
  }
}
export default App;
