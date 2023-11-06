import Navbar from '../../Component/Navbar';
import Footer from '../../Component/Footer';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
            
        </div>
    );
};

export default Main;