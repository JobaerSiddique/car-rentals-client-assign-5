import { Link } from "react-router-dom";
import logo from "../../image/logocar.jpg"

const Footer = () => {
    return (
        <div>
            <footer className="footer bg-black text-white p-10">
  <aside>
  <div className="avatar">
  <div className="w-24 rounded-full">
    <img src={logo} />
  </div>
</div>
    <p>
     Car Rental House
      <br />
      Providing reliable tech since 2016
    </p>
  </aside>
  <nav >
  <h6 className="footer-title">Social</h6>
    <a href="https://www.facebook.com/" target="blank" className="link link-hover">FaceBook</a>
    <a href="https://www.instagram.com/" target="blank" className="link link-hover">Instragram</a>
    <a href="https://x.com/" target="blank" className="link link-hover">X</a>
  </nav>
  <nav>
    <h6 className="footer-title">Company</h6>
    <Link to="/about-us" className="link link-hover">About us</Link>
    <Link to="/contactUs" className="link link-hover">Contact</Link>
 
  </nav>
  <nav>
  <h6 className="footer-title">Company Policy</h6>
    <Link to="/terms&Condtions" className="link link-hover">Terms of use</Link>
   
  </nav>
</footer>
        </div>
    );
};

export default Footer;