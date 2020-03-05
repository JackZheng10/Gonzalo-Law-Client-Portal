import React, {useState} from 'react';

const NewProject= (props)=>{

  const [name, setName] = useState("");
  const [type, setType] = useState("");

  if(!props.isOpen) {
    return null;
  }

  const handleChange = (e)=>{
    switch(e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "type":
        setType(e.target.value);
        break;
      default:
        break;
    }
  }

  const handleSubmit = (e)=>{
    e.preventDefault();

    props.addData(
      {name: name,
      type: type}
    );

    setName("");
    setType("");

    props.setOpen(false);
  }

  const handleCancel = (e)=>{
    setName("");
    setType("");
    props.setOpen(false);
  }

  return(

    <form onSubmit={handleSubmit}>
      <div>
        <button type="submit" value="Submit">Save</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </div>
      <div>
        <label>Name
          <input type="text" placeholder="Enter a name" name="name" value={name} onChange={handleChange} required />
        </label>
        <label>Type
          <input type="text" placeholder="Enter a type" name="type" value={type} onChange={handleChange} required />
        </label>
      </div>
    </form>
  )

}


export default NewProject;
