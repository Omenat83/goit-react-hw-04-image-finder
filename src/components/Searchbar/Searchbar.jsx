import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiSearchAlt2 } from 'react-icons/bi';
import { Header, Form, Button, Span, Input } from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  // state = {
  //   localInput: '',
  // };
  const [localInput, setLocalInput] = useState('');

  // відслідковування input-a
  const inputChange = ({ target: { value } }) => {
    setLocalInput(value);
  };

  // передача значення зі стейту в App під час сабміту форми
  const handleSubmit = e => {
    e.preventDefault();
    if (localInput.trim() === '') {
      toast.warn('Enter something');
      return;
    }
    onSubmit(localInput);
    setLocalInput('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <BiSearchAlt2 size="25px" />
          <Span>Search</Span>
        </Button>

        <Input
          type="text"
          name="localInput"
          value={localInput}
          onChange={inputChange}
          // autocomplete="off"
          // autofocus
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
