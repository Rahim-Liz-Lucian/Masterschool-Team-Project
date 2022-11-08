import { Link } from "react-router-dom";

const Navigation = () => {
    return ( 
        <>
            <div>
                <Link to="/">Homepage</Link>
                <br/>
                <Link to="/login">Login</Link>
                <br/>
                <Link to="/restrictedpage">Restricted Page</Link>
            </div>
        </>
     );
}
 
export default Navigation;