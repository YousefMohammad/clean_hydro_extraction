import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'; 
import { faTwitter } from '@fortawesome/free-brands-svg-icons'; 
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function Icons(){
    return(
        <div className='icons'>
          <FontAwesomeIcon className='brand fa-facebook'  icon={faFacebook} />
          <FontAwesomeIcon className='brand fa-google' icon={faGoogle} />
          <FontAwesomeIcon className='brand fa-twitter' icon={faTwitter} />
        </div>
    )
}