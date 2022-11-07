import React from 'react';
import Form from './Form/Form';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import css from './App.module.css';
import { useEffect, useState } from 'react';
import useLocalStorage from '../Hooks/useLokalStorage';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filterQuery, setFilterQuery] = useState('');
  // const [contacts, setContacts] = useState([]);

  // useEffect(() => {
  //   if (contacts.some(contact => contact.name === name)) {
  //     alert(`contact ${name} already in contacts`);
  //     return;
  //   }
  //   setContacts(state => [...state, { name, number }]);
  // }, [contacts, name, number, setContacts]);

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

  // useEffect(() => {
  //   const normilizedFilter = filterQuery.toLowerCase();
  //   if (normilizedFilter !== '') {
  //     setContacts(prevState =>
  //       prevState.filter(contact =>
  //         contact.name.toLowerCase().includes(normilizedFilter)
  //       )
  //     );
  //   }
  // }, [contacts, filterQuery, setContacts]);

  // const getVisibleContacts = () => {
  //   const normilizedFilter = filterQuery.toLowerCase();
  //   console.log(contacts);
  //   return contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(normilizedFilter)
  //   );

  //   return contacts;
  // };

  return (
    <div className={css.container}>
      <h1 className={css.titlePhonebook}>Phonebook</h1>
      <Form onSubmit={formSubmitHandler} />
      <Filter value={filterQuery} onChange={changeFilter} />
      <h2 className={css.contactList}>Contacts</h2>
      {contacts.length > 0 && (
        <ContactList
          contacts={contacts.filter(contact =>
            contact.name.toLowerCase().includes(filterQuery.toLowerCase())
          )}
          onDeleteContact={deleteContact}
        />
      )}
    </div>
  );
}
