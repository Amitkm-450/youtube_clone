import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, IconButton } from "@mui/material";
import { Search } from '@mui/icons-material';


const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const nevigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if(searchTerm)
     nevigate(`/search/${searchTerm}`);
    
    setSearchTerm('');
  }
  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        borderRadius: 20 ,
        border: '1px solid #e3e3e3',
        pl: 2,
        boxShadow: 'none',
        mr: {sm: 5} //margin on small devices
      }}
    >
      <input 
       className="search-bar"
       placeholder="Search..."
       value={searchTerm}
       onChange={(e) => {
           e.preventDefault();
           setSearchTerm(e.target.value);
       }}
      />
      <IconButton type="submit" sx={{
        p:'10px', color: 'red'
      }}>
        <Search/>
      </IconButton>
    </Paper>
  )
}

export default SearchBar