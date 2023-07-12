
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Createmenu from './Components/Createmenu';
import MenuDisplay from './Components/MenuDisplay';
import { useEffect ,useState } from 'react';
import axios from 'axios';

function App() {

//   const [child,setChild]=useState([]);

//   useEffect(()=>{
//     axios.get('http://localhost:8080/parent-is-null')
//     .then(res=>{
//         console.log(res.data);
//         setChild(res.data)
//     })
//     .catch(err=>{
//         console.log(err)
//     })

// },[])

  return (
    
     <BrowserRouter>
     
     <Routes>

    <Route path='/' element={<Createmenu></Createmenu>} />
<Route path='/display' element={<MenuDisplay ></MenuDisplay>}/>
     </Routes>
     
     
     </BrowserRouter>
    
  );
}

export default App;
