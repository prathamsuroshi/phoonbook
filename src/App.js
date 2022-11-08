import React, { useState } from 'react'
import data from "./phone-book-data.json";

import {nanoid} from "nanoid";

const App = () => {
  const [contacts , setcontact] = useState(data);

  const [adddata , addnewdata] = useState({
    fullName:"",
    address:"",
    phoneNumber:"",
    email:"",
  });

  const handleaddformchange = (event) =>{
    event.preventDefault();

    const fieldname = event.target.getAttribute("name");
    const fieldvalue = event.target.value;

    const newformData = {...adddata};
     newformData[fieldname] = fieldvalue; 

     addnewdata(newformData);
  };

  const handleaddfromsubmit = (event) =>{
    event.preventDefault();

    const newdata = {
      id : nanoid(),
      fullName: adddata.fullName,
      email: adddata.email,
      address : adddata.address,
      phoneNumber : adddata.phoneNumber,
    };

    const newcontact = [...contacts,newdata];
    setcontact(newcontact);

  }
  
  const handelDeleteclick = (contactId) => {
    const newcontact = [...contacts];
    const index = contacts.findIndex((contact) => contact.id === contactId);

    newcontact.splice(index, 1);
    setcontact(newcontact);
  }

  return (
    
    <div className='container'>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Phone Number</td>
            <td>Address</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) =>
          <tr>
          <td>{contact.fullName}</td>
          <td>{contact.email}</td>
          <td>{contact.phoneNumber}</td>
          <td>{contact.address}</td>
          <td><button onClick={() => handelDeleteclick(contact.id)}>delete</button></td>
        </tr> 
          )}
        </tbody>
      </table>

      <form onSubmit={handleaddfromsubmit}>
        <div className='addcontact'>
          <h2>Add new Contact</h2>
          <input name='fullName' type="text" required="required" placeholder="Enter your name" onChange={handleaddformchange} ></input>
          <input name='email' type="text" required="required" placeholder="Enter your email" onChange={handleaddformchange}></input>
          <input name='phoneNumber' type="text" required="required" placeholder="Enter your phone Number" onChange={handleaddformchange}></input>
          <input name='address' type="text" required="required" placeholder="Enter your address" onChange={handleaddformchange}></input>
          <button type='submit' >Add</button>
        </div>
      </form>
    </div>
    
  )
}

export default App