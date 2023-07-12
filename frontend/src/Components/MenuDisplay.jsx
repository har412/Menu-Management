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
    }
    const deleteMenu = (id) => {
       axios.delete(`http://localhost:8080/delete-menu/${id}`)
       .then(data=>
        console.log(data))
        
        .catch(err=>{
            console.log(err)
        })  
    }
    useEffect(() => {
        axios.get('http://localhost:8080/menu')
            .then(res => {
                console.log(typeof (res));
                console.log(res.data);
                setMenuItems(res.data)
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
                                    
                                    <ul>{menuItem.child.map((childMenu) => <DisplayMenuItems menuItems={[childMenu]} />)}</ul>
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