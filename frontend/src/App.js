import { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    axios.get('/api/values').then(res => {
      console.log('get res :', res);
      setList(res.data);
    }).catch(e => {
      console.error(e);
    })
  }, []);

  const changeHandler = (e) => {
    setValue(e.currentTarget.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    axios.post('/api/value', { value: value }).then(res => {
      console.log('res.data :', res.data);

      if(res.data.isSuccess) {
        setList([...list, res.data]);
        setValue('');
      } else {
        window.alert('failed to post value')
      }
    }).catch(e => {
      console.error(e);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <div className="container">
          {list?.map((item, index) => {
            return <li key={index}>{item.value}</li>
          })}

          <form className="example" onSubmit={submitHandler}>
            <input type="text" placeholder="input" onChange={changeHandler} value={value} />
            <button type="submit">submit</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
