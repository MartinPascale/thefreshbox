import React from 'react';

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', email: '', message: '' };
  }

  /* Here’s the juicy bit for posting the form submission */

  handleSubmit = (e) => {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...this.state }),
    })
      .then(() => alert('Success!'))
      .catch((error) => alert(error));

    e.preventDefault();
  };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, message } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className='form'>
        <input
          type='text'
          name='name'
          value={name}
          onChange={this.handleChange}
          placeholder='Nombre'
          className='form__input'
        />
        <input
          type='email'
          name='email'
          value={email}
          placeholder='Email'
          onChange={this.handleChange}
          className='form__input'
        />
        <textarea
          name='message'
          value={message}
          onChange={this.handleChange}
          placeholder='Mensaje'
          className='form__text-area'
        />
        <button
          disabled={!name || !email || !message}
          className='form__submit'
          type='submit'
        >
          Enviar
        </button>
      </form>
    );
  }
}

export default ContactForm;
