import React from 'react' 
import {CgProductHunt} from 'react-icons/cg'
import { Link } from 'react-router-dom';
import "./Home.scss"
import heroImg from "../../assets/inv-img.png"
import { ShowOnLogin, ShowOnLogout } from '../../components/protect/hiddenLinks';


 const Home = () => {
  return (
    <div className='home'>
        <nav className='container --flex-between'>
            <div className='logo'>
                <CgProductHunt size={35}/>

            </div>
            <ul className='home-links'>
                <ShowOnLogout>
                <li>
                    <Link to="/register">Register</Link>
                </li>
                </ShowOnLogout>
                <ShowOnLogout>
                <li>
                    <button className='--btn --btn-primary'>
                        <Link to="/login">Login</Link>
                    </button>
                    
                </li>
                </ShowOnLogout>
                <ShowOnLogin>
                 <li>
                    <button className='--btn --btn-primary'>
                        <Link to="/dashboard">Dashboard</Link>
                    </button>
                    
                </li>
                </ShowOnLogin>
                

            </ul>
        </nav>
        <br/> 
        <br/> 
        <br/>
        <section className='container hero'>
            <div className='hero-text'>
                <h2>Warehouse Management</h2> 
                <p>The system is developed to control and manage the products in the warehouse in real time and
                   integrate to make the business easier
                   These motives can be transactional, precaution or speculative in nature. For example, a company can decide to hold stock to meet production
                   or sales goals as well as to cover the possibility that underestimations might take place in future,
                   it can also hold stock if there is a possibility of gaining more in the future thus holding more of the stock.
                </p>
                
            </div>
            <div className='hero-image'>
              <img src={heroImg} alt='Inventory'></img>
            </div>
        </section>
    </div>
  );
};
export default Home;

