import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Loading = ({msg}) => {
  
  return (
      <div id='loading'>
        {msg || 'Loading...'} <FontAwesomeIcon icon={faSpinner} spin/>
      </div>
  )
}

export default Loading