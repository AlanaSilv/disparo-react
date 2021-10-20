import { useState } from 'react';
import Headers from './Headers';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';
import './App.css';



function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);


  const [campos, setCampos] = useState({
    nome: '',
    email: '',
    message: '',
    annex: '',
  })

  function handleInputChange(event) {
    if (event.target.name === 'annex')
      campos[event.target.name] = event.target.files[0];
    else
      campos[event.target.name] = event.target.value;
    setCampos(campos);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log(campos);
    send();
  }

  function send(){
    const formData = new FormData();
    Object.keys(campos).forEach(key =>formData.append(key, campos[key]));
    axios.post('/send', formData, {
      headers: { 
        'Content-Type': `multipart/form-data; boundary=${formData._boundary} ` 

      }
    } )  
    
    .then(response => alert(JSON.stringify(response.data)));
  }


  return (
    <div id="form">
      <Headers/>
      <Col sm={12}>
          <div className="container">
            <form onSubmit={handleFormSubmit}>
              <FormGroup row>
                <h1 id="text">Digite seu email</h1>
                <label htmlFor="email" ></label>
                <Col sm={8}>
                <input type="text" id="email" name="email" placeholder="Digite o email do destino..." onChange={handleInputChange}/>
                </Col>   
                <label htmlFor="nome"></label>
                <Col sm={8}>
                <input type="text" id="nome" name="nome" placeholder="Seu nome" onChange={handleInputChange}/>
                </Col>

                
                <label htmlFor="message"></label>
                <Col sm={8}>
                <textarea id="message" name="message" placeholder="Digite sua mensagem..." onChange={handleInputChange}/>
                </Col>

                <label htmlFor="annex"></label>
                <Col sm={8}>
                <input type="file" id="annex" name="annex" onChange={handleInputChange}/>
                </Col>
                <Col sm={12}>
                <input type="submit" value="Enviar"/>
                </Col>
              </FormGroup>
          </form>
        </div>
       </Col>
    </div>
  );
 
}



export default App;
