import React from 'react'
import axios from 'axios'

function DisplayMenuItems(props) {
    console.log(props,"in")
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
  return (
    <>
    <ul>
    {   
       props.menuItems.map((menuItem)=>(
            <li>
            <a className={ menuItem.child ? 'top-tier' : '' } href="#">
              <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                <span>{menuItem.name}</span>
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
              <ul>{menuItem.child.map((childMenu) => <DisplayMenuItems  menuItem={childMenu.child}  />)}</ul>
            )}
          </li>
        ))
    }
   
   </ul>
    </>
  )
}

export default DisplayMenuItems
