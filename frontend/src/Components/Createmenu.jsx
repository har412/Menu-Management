import React, { useEffect ,useState ,useRef } from 'react'
import { Link  ,useNavigate} from 'react-router-dom'

import axios from  'axios'
function Createmenu() {

    const [menu,setMenu] = useState([])
    const menuRef = useRef()
    const name = useRef()
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get('https://menu-management.onrender.com/all-menu')
        .then(res=>{
            console.log(res)
            setMenu(res.data)
            
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
    const submitHandle = ()=>{
        console.log(menuRef.current.value)
        console.log(name.current.value)
        const data = {
            "name":name.current.value,
            "parent_id":menuRef.current.value
        }
        axios.post('https://menu-management.onrender.com/create-menu',data)
        .then(res=>{
            console.log(res)
            navigate('/display')
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const deleteAll = () =>{
        axios.delete('https://menu-management.onrender.com/delete-all')
        .then(res=>{
            console.log(res)
          navigate('display')
            
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return (

        <>
            <h1 class="text-center  " style={{ color: "aqua", fontFamily: "Lucida Sans" }} >Menu Management Application</h1>

            <div class="container-fluid">
                <div class="row flex-column">
                    <div class="col-lg-6 offset-lg-3 box my-5 p-4">
                        <h2 class="text-center" style={{ color: "aqua" }}>Create Menu</h2>
                        <input type="text" class="form-control my-3" placeholder="Name of Menu"  ref={name}/>
                        <select name="" id="" class="custom-select my-3" ref={menuRef} >
                             <option value="0" defaultChecked ></option>
                             { 
                              menu.map((data)=>(
                                    <option value={data._id ? data._id : "0"}>{data.name}</option>
                                ))
                            }
                         
                        </select>
                        <div class="d-flex justify-content-center my-3">
                            <button class="btn btn-success" onClick={submitHandle} >Submit</button>
                        </div>
                        <div class="d-flex justify-content-center">
                            <button class="btn btn-danger" onClick={deleteAll} >Delete All Menu's</button>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <Link to={'/display'}> <button class="btn btn-warning" style={{ padding: "7px 60px", fontSize: "20px", color: "black" }}>Show the Menu</button> </Link>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Createmenu
