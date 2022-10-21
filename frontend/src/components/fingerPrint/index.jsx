import { useRef } from 'react'
import axios from 'axios';

function fingerPrint() {

  const responseRef = useRef();

  const api = axios.create({
    baseURL: "http://192.168.10.85"
  })
  axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
  axios.defaults.headers.get['Content-Type'] ='application/json;charset=utf-8';


  const handleRegisterBtn = (e) => {
    e.preventDefault();
    console.log("OK")

    api.get('/register')
      .then( res => {
        responseRef.current.innerHTML = res.data.msg
        api.get('/register2')
          .then( res => {
             responseRef.current.innerHTML = res.data.msg

             api.get('/register3')
             .then( res => {
                responseRef.current.innerHTML = res.data.msg
                api.get('/register4?par=1')
                .then( res => {
                   responseRef.current.innerHTML = res.data.msg
                })
             })
          })
      })
  };

  const handleCheckBtn = (e) => {
    e.preventDefault();
    console.log("OK")
    api({
      method: 'get',
      headers: { 'Access-Control-Allow-Origin': '*'},
      url: '/find',
    })
      .then( res => {

        responseRef.current.innerHTML = res.data.msg
        console.log(res.data.msg)

        api.get('/find2')
          .then( res => {
            responseRef.current.innerHTML = res.data.msg
          })

      })
  };

  return (
    <div className="App">
      <header className="App-header">
        <p ref={responseRef}>
          Escolha a ação!
        </p>
        <button
          onClick={handleCheckBtn}          
        >
          Verificar
        </button>
        <button
          onClick={handleRegisterBtn}
        >
          Cadastrar
        </button>
      </header>
    </div>
  );
}

export default fingerPrint;
