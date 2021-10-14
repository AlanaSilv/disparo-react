import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

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
    <div className="container">
       <form onSubmit={handleFormSubmit}>
         <label htmlFor="email">Email</label>
         <input type="text" id="email" name="email" placeholder="Digite o email do destino..." onChange={handleInputChange}/>
         
         <label htmlFor="nome">Nome</label>
         <input type="text" id="nome" name="nome" placeholder="Seu nome" onChange={handleInputChange}/>
         
         <label htmlFor="message">Mensagem</label>
         <textarea id="message" name="message" placeholder="Digite sua mensagem..." onChange={handleInputChange}/>

         <label htmlFor="annex">Anexo</label>
         <input type="file" id="annex" name="annex" onChange={handleInputChange}/>

         <input type="submit" value="Enviar"/>
       </form>
    </div>
  );
}

export default App;
