import React, { useEffect } from 'react'
import axios from 'axios'

function DisplayMenuItems(props) {

    

    console.log(props.child,"in")
    console.log(typeof(props.child[0]))
    useEffect(()=>{
      if(typeof(props.child[0])==String){
        
      }
    },[])

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
                props.setMenuItems(res.data.data)
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
                props.setMenuItems(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    })
     
     .catch(err=>{
         console.log(err)
     })  
    }
  return (
    <>
    <ul>
    {   
     props.child &&  props.child.map((menuItem)=>(
            <li> 
            <a className={ menuItem.child ? 'top-tier' : '' } href="#">
              <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                <span>{menuItem.name}</span>
                {/* <span>{menuItem}</span> */}
                <span>
                  <img
                    src="/images/pen.png"
                    className="mx-2"
                    alt=""
                    onClick={() => editMenu(menuItem._id)}
                  />
                  <img
                    src="/images/trash.png"
                    className="mx-2"
                    alt=""
                    onClick={() => deleteMenu(menuItem._id)}
                  />
                </span>
              </div>
            </a>
            {menuItem.child && menuItem.child.length > 0 && (
              <ul>{menuItem.child.map((child) => <DisplayMenuItems  child={[child]}  />)}</ul>
            )}
          </li>
        ))
    }
   
   </ul>
    </>
  )
}

export default DisplayMenuItems
