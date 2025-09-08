import EditTask from "./EditTask";
import ViewTask from "./ViewTask";
import { useState } from "react";

function TaskPage() {
  
    const [isEditing, setIsEditing] = useState(false);
    
  
      const handleIsEditing = () =>{
        if(isEditing){
          setIsEditing(false)
        }else{
          setIsEditing(true)
        }
      }
  
  
  
  return (
    <>
      {!isEditing && <ViewTask isEditing={isEditing} handleIsEditing={handleIsEditing} />}
      {isEditing && <EditTask isEditing={isEditing} handleIsEditing={handleIsEditing} setIsEditing={setIsEditing} />}
    </>
  );


}

export default TaskPage;
