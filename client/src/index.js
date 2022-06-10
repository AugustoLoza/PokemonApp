import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from "./store/store.js";


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


/*const deletePokemon = async(req,res)=>{
  const {id = ""} = req.params;
  
 try {const pokemon = await Pokemon.findByPk(id);
  if(pokemon)
  {
  await pokemon.destroy();
  res.json(pokemon)
  
 } catch (error) {
 res.status(404).json({"el mensaje que quieras"})
 }   
}
}*/
