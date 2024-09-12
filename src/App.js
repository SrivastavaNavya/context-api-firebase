import { useState } from 'react';
import './App.css';
import { useFirebase } from './context/Firebase';

function App() {
  const firebase = useFirebase()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  console.log(firebase)

  const putDataNew=()=>{
    firebase.putData("grandfather/father/child", { name: "Navya", age: 21 })
  }

  return (
    <div className="App">
      <h1>Firebase</h1>
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Enter your email' />
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Enter your password' />
      <button onClick={() => {
        firebase.signUpUserWithEmailAndPassword(email, password)
        firebase.putData('users/' + 'ryan', { email, password })
      }}>Sign Up</button>
      <br />
      <button onClick={putDataNew}>Button for Realtime db</button>
    </div>
  );
}

export default App;
