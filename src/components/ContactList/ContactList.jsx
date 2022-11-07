import css from '../ContactList/ContactList.module.css';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

const ContactList = ({ contacts, onDeleteContact }) => (
  <ul className={css.contactList}>
    {contacts.map(({ name, number }) => (
      <li className={css.contacts__item} key={nanoid()}>
        <p className={css.contacts__name}>{name}</p>
        <p className={css.contacts__number}>{number}</p>
        <button
          type="button"
          className={css.delete__btn}
          onClick={() => onDeleteContact(name)}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

ContactList.prototype = {
  contacts: PropTypes.object.isRequired,
};

export default ContactList;
