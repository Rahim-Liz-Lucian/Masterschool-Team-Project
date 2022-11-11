import {useState, useContext} from "react"
import { UserContext } from "../Context/UserContext";
import { ProductContext } from "../Context/ProductContext";
import {db} from "../firebase"
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const UploadProduct = () => {
    const navigate = useNavigate();

    const {userName} = useContext(UserContext)
    const {products, setProducts} = useContext(ProductContext)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [tags, setTags] = useState("")
    const [expirationDate, setExpirationDate] = useState("")
    const [location, setLocation] = useState("")

    const handleUploadProduct = async () => {
        try {
            const newProduct = {
                title: title,
                description: description,
                tags: tags,
                expirationDate: expirationDate,
                location: location,
                userUploaded: userName
              }
            await setDoc(doc(db, "products", uuidv4()), newProduct);
            setProducts([...products, newProduct])
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

                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Upload Product</p>

                                <form className="mx-1 mx-md-4">

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                    <div className="form-outline flex-fill mb-0">
                                    <input type="text" className="form-control" value={title} onChange={(e) => {setTitle(e.target.value)}}/>
                                    <label className="form-label">Title</label>
                                    </div>
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                    <div className="form-outline flex-fill mb-0">
                                    <input type="text" className="form-control" value={description} onChange={(e) => {setDescription(e.target.value)}}/>
                                    <label className="form-label">Description</label>
                                    </div>
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                    <div className="form-outline flex-fill mb-0">
                                    <input type="text" className="form-control" value={location} onChange={(e) => {setLocation(e.target.value)}}/>
                                    <label className="form-label">Location</label>
                                    </div>
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                    <div className="form-outline flex-fill mb-0">
                                    <input type="text" className="form-control" value={tags} onChange={(e) => {setTags(e.target.value)}}/>
                                    <label className="form-label">Tags</label>
                                    </div>
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                    <div className="form-outline flex-fill mb-0">
                                    <input type="text" className="form-control" value={expirationDate} onChange={(e) => {setExpirationDate(e.target.value)}}/>
                                    <label className="form-label">expiration date</label>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                    <button type="button" className="btn btn-primary btn-lg" onClick={() => {
                                        if (title && description && location && tags && expirationDate){
                                            handleUploadProduct()
                                        }else{
                                            window.alert("fill out everything")
                                        }
                                    }}>Upload</button>
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
 
export default UploadProduct;