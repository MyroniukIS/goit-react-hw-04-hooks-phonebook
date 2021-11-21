import styles from './ContactList.module.css';
import { PropTypes } from 'prop-types';

function ContactList({ contacts, handleDelete }) {
  const contactsList = contacts.map(({ id, name, number }) => (
    <li className={styles.item} key={id}>
      <div>
        <span className={styles.item_text}>
          {name}: {number}
        </span>
        <button
          className={styles.item_button}
          id={id}
          type="button"
          onClick={() => handleDelete(id)}
        >
          Delete
        </button>
      </div>
    </li>
  ));

  return <ul className={styles.list}>{contactsList}</ul>;
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ContactList;
