import React from 'react'
import Alert from 'react-bootstrap/Alert';

const ShowAlert = ({variant, msg, show}) => {
  
  return (
    <div>
        <Alert key={variant} variant={variant} >
          {msg}
        </Alert>
    </div>
  )
}

export default ShowAlert