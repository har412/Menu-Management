import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios';
import DisplayMenuItems from './DisplayMenuItems';

function MenuDisplay() {
    const [menuItems, setMenuItems] = useState([])
    console.log("menu")
    const editMenu = (id) => {
        console.log(id)
        const name = prompt("Enter the Updated name")
        const body ={
            "id":id,
            "name":name
        }
        axios.put(`https://menu-management.onrender.com/update-menu`,body)
        .then((data)=>{
            console.log(data)
            axios.get('https://menu-management.onrender.com/parent-is-null')
            .then(res => {
                console.log(typeof (res));
                console.log(res.data.data,"first");
                setMenuItems(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
        })
         
         .catch(err=>{
             console.log(err)
         })  
    }
    const deleteMenu = (id) => {
       axios.delete(`https://menu-management.onrender.com/delete-menu/${id}`)
       .then((data)=>{
        console.log(data)
        axios.get('https://menu-management.onrender.com/parent-is-null')
            .then(res => {
                console.log(typeof (res));
                console.log(res.data.data,"first");
                setMenuItems(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    })
     
     .catch(err=>{
         console.log(err)
     })  
    }
    useEffect(() => {
        axios.get('https://menu-management.onrender.com/parent-is-null')
            .then(res => {
                console.log(typeof (res));
                console.log(res.data.data,"first");
                setMenuItems(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])
    return (
        <>   <div class="d-flex justify-content-center my-5">
          <Link to={'/'}> <button class="btn btn-warning"
                style={{padding:"7px 60px",fontSize:'20px',color:'black'}}>Manage Menu</button></Link>
        </div>
            <div class="tiered-menu" style={{ width: "300px", background: "#47979", position: "relative" }}>
                <ul>
                    {
                        menuItems.map((menuItem) => (
                            <li>
                                <a href="#">
                                    <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                                        <span>{menuItem.name}</span>
                                        <span>
                                            <img
                                                src="./images/pen.png"
                                                className="mx-2"
                                                alt=""
                                                onClick={() => editMenu(menuItem._id)}
                                            />
                                              <img
                                                src="./images/trash.png"
                                                className="mx-2"
                                                alt=""
                                                onClick={() => deleteMenu(menuItem._id)}
                                            />  
                                        </span>
                                    </div>
                                </a>
                                {menuItem.child && menuItem.child.length > 0 && (
                                    
                                    <ul>{menuItem.child.map((child) => <DisplayMenuItems setMenuItems={setMenuItems} child={[child]} />)}</ul>
                                )}
                            </li>
                        ))
                    }

                </ul>
            </div>
        </>
    )
}


export default MenuDisplay
