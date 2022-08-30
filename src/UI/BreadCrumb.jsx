import React from 'react'
import {Link} from 'react-router-dom'
import "../UI/BreadCrumb.css"

function Breadcrumb(props) {
  return (
    <div className='breadcrumb'>
        <Link to="/">
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.90625 9.64453L5.1875 9.39844C5.32812 9.22266 5.32812 8.97656 5.1875 8.80078L2.23438 5.84766H15.4531C15.6641 5.84766 15.875 5.67188 15.875 5.42578V5.07422C15.875 4.86328 15.6641 4.65234 15.4531 4.65234H2.23438L5.1875 1.73438C5.32812 1.55859 5.32812 1.3125 5.1875 1.13672L4.90625 0.890625C4.76562 0.714844 4.48438 0.714844 4.34375 0.890625L0.230469 4.96875C0.0546875 5.14453 0.0546875 5.39062 0.230469 5.56641L4.34375 9.64453C4.48438 9.82031 4.76562 9.82031 4.90625 9.64453Z" fill="#8C8E8D"/>
          </svg>
        </Link>

        <p>{props.pageName}</p>
    </div>
  )
}

export default Breadcrumb