import React, {useState} from "react";


function TodoItem(props){

    const [isChecked, setIsChecked] = useState(props.isChecked); 
    const completedTime = isChecked ? Date.now : "";
   
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const options = {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        return date.toLocaleDateString(undefined, options);
    };

    const handleCheckboxClick = async() => {
      setIsChecked(!isChecked);
      url = `http://localhost/updateTodo/${props.id}`
      const payload = {
        "_id":props.id,
        "title":props.title,
        "description":props.description,
        "completed":isChecked,
        "addedTime":props.addedTime,
        "completedTime":completedTime
      };
      try {
        await fetch(url,{
          method:'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(payload)
        })
      }catch(e){
        console.log('error while updating the todo'+e);
      }
    }
  
    return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.description}</p> 
      <p>`time added`{formatTime(props.addedTime)}</p>
     {props.completedTime != "" ? <p>Completed time: {formatTime(props.completedTime)}</p>: null}
      <input
        type='checkbox'
        checked={isChecked}
        onChange = {handleCheckboxClick}
      ></input>
    </div>
    );
  }
  

export default TodoItem;