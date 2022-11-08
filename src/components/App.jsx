import React from 'react';
import Form from './Form/Form';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import css from './App.module.css';
import { useState, useMemo } from 'react';
import useLocalStorage from '../Hooks/useLokalStorage';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filterQuery, setFilterQuery] = useState('');

  const formSubmitHandler = ({ name, number }) => {
    if (contacts.some(contact => contact.name === name)) {
      alert(`contact ${name} already in contacts`);
      return;
    }
    setContacts(state => [...state, { name, number }]);
  };

  const deleteContact = contactName => {
    setContacts(prevState =>
      prevState.filter(contact => contact.name !== contactName)
    );
  };

  const changeFilter = evt => {
    setFilterQuery(evt.currentTarget.value);
  };

  const getVisibleContacts = useMemo(() => {
    const normilizedFilter = filterQuery.toLowerCase();
    console.log(contacts);
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normilizedFilter)
    );
  }, [contacts, filterQuery]);

  return (
    <div className={css.container}>
      <h1 className={css.titlePhonebook}>Phonebook</h1>
      <Form onSubmit={formSubmitHandler} />
      <Filter value={filterQuery} onChange={changeFilter} />
      <h2 className={css.contactList}>Contacts</h2>
      {contacts.length > 0 && (
        <ContactList
          contacts={getVisibleContacts}
          onDeleteContact={deleteContact}
        />
      )}
    </div>
  );
}
