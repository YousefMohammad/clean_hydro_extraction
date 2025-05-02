import React from 'react';
import '../styles/footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRecycle } from '@fortawesome/free-solid-svg-icons';
import {faFacebook, faInstagram, faDribbble, faYoutube} from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__branding">
          <div className="footer__logo">
            <FontAwesomeIcon icon={faRecycle} />
            <span>H2Synergy</span>
          </div>
          <p>Copyright © 2020 Landify UI Kit.<br />All rights reserved</p>
          <div className="footer__socials">
            <a href="#">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faDribbble} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a href="#"></a>
            <a href="#"></a>
          </div>
        </div>

        <div className="footer__section">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About us</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Contact us</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Testimonials</a></li>
          </ul>
        </div>

        <div className="footer__section">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help center</a></li>
            <li><a href="#">Terms of service</a></li>
            <li><a href="#">Legal</a></li>
            <li><a href="#">Privacy policy</a></li>
            <li><a href="#">Status</a></li>
          </ul>
        </div>

        <div className="footer__subscribe">
          <h4>Stay up to date</h4>
          <div className="footer__input-group">
            <input type="email" placeholder="Your email address" />
            <button type="submit">
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
