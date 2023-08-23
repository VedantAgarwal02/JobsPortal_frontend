import React from 'react'
import Alert from 'react-bootstrap/Alert';

const ShowAlert = ({variant, msg}) => {

  const alertStyle = {
    fontWeight:'700',
    textAlign:'center',
    margin: 'auto',
    backgroudColor:'rgb(255,255,255)',
    width:'20%',
    border:'2px solid black',
    padding:'0',
    marginTop:'0.5%'
  }
  
  return (
    <div>
        <Alert  variant={variant} id="alert" style={alertStyle} >
          {/* {msg || variant==='success'?'Success':'Failure'} */}
          {msg}
        </Alert>
    </div>
  )
}

export default ShowAlert