import React, { Component } from 'react';
import styles from './ContactForm.module.css';
import { PropTypes } from 'prop-types';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;

    this.setState({ [name]: value });
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  handleSubmit = e => {
    e.preventDefault();

    const inputName = e.currentTarget.name.value;
    const inputNumber = e.currentTarget.number.value;

    this.props.onSubmit(inputName, inputNumber);
    this.reset();
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={styles.form_container} onSubmit={this.handleSubmit}>
        <label className={styles.form_label}>
          Name
          <input
            className={styles.form_input}
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            onChange={this.handleChange}
            required
          />
        </label>
        <label className={styles.form_label}>
          Number
          <input
            className={styles.form_input}
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            onChange={this.handleChange}
            required
          />
        </label>
        <button className={styles.form_button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default ContactForm;
