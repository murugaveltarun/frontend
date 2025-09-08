
export const sort = (task,factor) => {
    switch (factor) {
        case "dueDateAsc" :
            return [...task].sort((a,b)=>(new Date(a.dueDate)) - (new Date(b.dueDate)));
        case "dueDateDesc" :
            return [...task].sort((a,b)=>(new Date(b.dueDate)) - (new Date(a.dueDate)));
        case "createdAtAsc" :
            return [...task].sort((a,b)=>(new Date(a.createdAt)) - (new Date(b.createdAt)));
        case "createdAtDesc" :
            return [...task].sort((a,b)=> (new Date(b.createdAt)) - (new Date(a.createdAt)));
        case "lastModifiedAtAsc" :
            return [...task].sort((a,b)=>(new Date(a.lastModifiedAt)) - (new Date(b.lastModifiedAt)));
        case "lastModifiedAtDesc" :
            return [...task].sort((a,b)=>(new Date(b.lastModifiedAt)) - (new Date(a.lastModifiedAt)));
        case "titleAsc" :
            return [...task].sort((a,b)=>(a.title.localeCompare(b.title)))        
        case "titleDesc" :
            return [...task].sort((a,b)=>(b.title.localeCompare(a.title)))
        default :
            return [...task].sort((a,b)=>(new Date(b.lastModifiedAt)) - (new Date(a.lastModifiedAt)));
    }
}