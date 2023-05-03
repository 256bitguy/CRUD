import React, { useState,useEffect } from 'react';
import daata from './data.json';

function App() {
  const [JsonData,setJsonData]=useState(daata);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [rows, setRows] = useState([]);
  const [val,setval]=useState({name:'',number:'',email:'',hobbies:''})
  useEffect(() => {
    // Save the updated JSON data to the file
    saveJsonData({ JsonData });
  }, [JsonData]);

   
  const handleDeleteRow = (rowIndex) => {
    const rowVAl = [...JsonData];
    rowVAl.splice(rowIndex,1);
    console.log(JsonData);
    setJsonData(rowVAl);
  };
  const saveJsonData = (data) => {
    // Convert the data to a JSON string
    const jsonDataString = JSON.stringify(data);

    // Write the JSON data to the file using a fetch request
    fetch('/my-route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonDataString
    });
  };

  const postData = async () => {
    const response = await fetch('/my-route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: 'Hello, World!' })
    });
    const data = await response.json();
    console.log(data);
  }




  const handleSelectRow = (rowIndex) => {
    const newRows = [...rows];
    newRows[rowIndex].selected = !newRows[rowIndex].selected;
    setRows(newRows);
  };

  

  const handleUpdateRow = (rowIndex, updatedRow) => {
    const newRows = [...rows];
    newRows[rowIndex] = updatedRow;
    setRows(newRows);
  };
  
  const handleAddRow = (value) => {
    const newval=[...JsonData,val];
    setJsonData(newval);
    
  };

  const handleSaveChanges = () => {
    // Implement save functionality here
  };

  const handleNameChange = (e) => {
    setval( {...val,name:e.target.value})

    setName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setval( {...val,number:e.target.value})
    
    setPhone(e.target.value);
  };

  const handleEmailChange = (e) => {
    setval( {...val,email:e.target.value})
     
    setEmail(e.target.value);
  };

  const handleHobbiesChange = (e) => {
    setval( {...val,hobbies:e.target.value})
    
    setHobbies(e.target.value);
  };

  const handleSaveClick =  () => {
    // Implement save functionality here
     fetch('/my-route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(val),
    });
   console.log(val);
  //   fetch('/my-route')
  // .then(response => response.json())
  // .then(data => setJsonData(data))
  // .catch(error => console.error(error));
 
  };
  
const datafill=(e)=>{
  console.log(e.target.value);
}
 
  return (
    <>
    <div>
      <form method="POST" onSubmit={datafill} >
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br />
        <label>
          Phone Number:
          <input type="number" value={phone} onChange={handlePhoneChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="text" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label>
          Hobbies:
          <input type="text" value={hobbies} onChange={handleHobbiesChange} />
        </label>
        <br />
        <button type="button" onClick={()=>postData()}>Save</button>
      </form>
    </div>
     <div>
     <table>
       <thead>
         <tr>
           <th>Select</th>
           <th>ID</th>
           <th>Name</th>
           <th>Phone Number</th>
           <th>Email</th>
           <th>Hobbies</th>
           <th>Update/Delete</th>
         </tr>
       </thead>
       <tbody>
         {JsonData.map((row, index) => (
           <tr key={index}>
             <td>
               <input type="checkbox" checked={row.selected} onChange={() => handleSelectRow(index)} />
             </td>
             <td>{row.id}</td>
             <td>
               <input
                 type='text'
                 value={row.name}
                 onChange={(e) => handleUpdateRow(index, { ...row, name: e.target.value })}
               />
             </td>
             <td>
               <input
                 type="text"
                 value={row.number}
                 onChange={(e) => handleUpdateRow(index, { ...row, number: e.target.value })}
               />
             </td>
             <td>
               <input
                 type="text"
                 value={row.email}
                 onChange={(e) => handleUpdateRow(index, { ...row, email: e.target.value })}
               />
             </td>
             <td>
               <input
                 type="text"
                 value={row.hobbies}
                 onChange={(e) => handleUpdateRow(index, { ...row, hobbies: e.target.value })}
               />
             </td>
             <td>
               <button type="button" onClick={() => handleDeleteRow(index)}>Delete</button>
             </td>
           </tr>
         ))}
       </tbody>
     </table>
     <button type="button" onClick={handleAddRow}>Add</button>
     <button type="button" onClick={handleSaveChanges}>Save Changes</button>
      
   </div>
   </>
  );
}

export default App;

