import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const options = ['Drama', 'Crime','Health and Fitness','News','Politics','Culture','History','Lifestories'];

export default function ControllableStates({setGenre}) {
  const [value, setValue] = React.useState(null);
  React.useEffect(()=>{
    setGenre(value)
  },[value])
  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}

        id="controllable-states-demo"
        options={options}
        sx={{ minWidth: 30,height:45,backgroundColor:"coral",color:"white",border:"2px solid grey",borderRadius:"5px" }}
        renderInput={(params) => <TextField   {...params} label="Genre" />}
      />
    </div>
  );
}
