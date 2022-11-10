import {useState, useContext} from "react"
import { UserContext } from "../Context/UserContext";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {firebaseApp, db} from "../firebase"
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";

const auth = getAuth();

const SignUp = () => {
    const navigate = useNavigate();
    const {setUserName, setUserEmail, setIsLoggedIn, setUserCity, setDbRefId, setAccessToken, setRefreshToken} = useContext(UserContext)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [city, setCity] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                setUserEmail(email)
                setUserName(name)
                setUserCity(city)
                setIsLoggedIn(true)
                setAccessToken(user.stsTokenManager.accessToken)
                setRefreshToken(user.stsTokenManager.refreshToken)
                handleAddUserInfoIntoDb(user.uid)

                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`error code: ${errorCode}\n error message: ${errorMessage}`)
            });
        console.log("signup")
    }

    const handleAddUserInfoIntoDb = async (uuid) => {
        try {
            await setDoc(doc(db, "users", uuid), {
                name: name,
                email: email,
                city: city
              });
            setDbRefId(uuid)
            navigate("/");
          } catch (e) {
            console.error("Error adding document: ", e);
          }

    }

    return ( 
        <>
            <section className="vh-100" >
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black">
                        <div className="card-body p-md-5">
                            <div className="row justify-content-center">
                            <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                <form className="mx-1 mx-md-4">

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                    <div className="form-outline flex-fill mb-0">
                                    <input type="text" className="form-control" value={name} onChange={(e) => {setName(e.target.value)}}/>
                                    <label className="form-label">Your Name</label>
                                    </div>
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                    <div className="form-outline flex-fill mb-0">
                                    <input type="text" className="form-control"  value={city} onChange={(e) => {setCity(e.target.value)}}/>
                                    <label className="form-label">Your City</label>
                                    </div>
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                    <div className="form-outline flex-fill mb-0">
                                    <input type="email" className="form-control"  value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                                    <label className="form-label">Your Email</label>
                                    </div>
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                    <div className="form-outline flex-fill mb-0">
                                    <input type="password" className="form-control"  value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                                    <label className="form-label">Password</label>
                                    </div>
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                    <div className="form-outline flex-fill mb-0">
                                    <input type="password" id="form3Example4cd" className="form-control"  value={repeatPassword} onChange={(e) => {setRepeatPassword(e.target.value)}}/>
                                    <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                    <button type="button" className="btn btn-primary btn-lg" onClick={() => {
                                        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && email && name && city && password && password === repeatPassword){
                                            handleSignUp()
                                        }else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
                                            window.alert("your email isnt valid")
                                        }else if (password !== repeatPassword){
                                            window.alert("passwords arent the same")
                                        }else{
                                            window.alert("fill out everything")
                                        }
                                    }}>Register</button>
                                </div>

                                </form>

                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </>
     );
}
 
export default SignUp;