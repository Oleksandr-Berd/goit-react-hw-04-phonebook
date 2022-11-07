import { useState } from 'react';
import { nanoid } from 'nanoid';
import css from '../Form/Form.module.css';

export default function Form({ onSubmit }) {
  const [id] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInput = evt => {
    const { name, value } = evt.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    onSubmit({ name, number, id: nanoid() });

    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <label htmlFor={nanoid()} className={css.label__name}>
        Name
        <input
          className={css.input__name}
          onChange={handleInput}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          handleid={nanoid()}
          required
        />
      </label>
      <label htmlFor={nanoid()} className={css.label__number}>
        Phone
        <input
          className={css.input__number}
          onChange={handleInput}
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          handleid={id}
          required
        />
      </label>

      <button type="submit" disabled={!name} className={css.btn__add}>
        Add contact
      </button>
    </form>
  );
}
