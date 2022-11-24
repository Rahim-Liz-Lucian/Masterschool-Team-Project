import "./product-card.css";

import fallback from "~/assets/brand/fallback.png";
import { useEffect, useState } from "preact/hooks";
import { getDoc } from "firebase/firestore";

const ProductCard = ({ product }) => {
    const { dataLoading, data: { user } } = useAggregateData({ product });

    if (dataLoading) return (
        <div>Loading...</div>
    );

    return (
        <div className="product__card">
            <img src={product.thumbnailURL} alt={product.description} />
            <div className="product__info">
                <h3>{product.title}</h3>
                <div>
                    <p>{user.location.city}</p>
                    <p>{product.expirationDate}</p>
                    <p>{2} days ago</p>
                </div>
                {/* <Button classes={"btn btn-secondary"}>More</Button> */}
            </div>
        </div>
    );
};

const useAggregateData = ({ product: { userRef, ...product } }) => {
    const [dataLoading, setDataLoading] = useState(true);
    const [user, setUser] = useState();

    useEffect(() => {
        (async () => {
            // error handling should go here
            const snapshot = await getDoc(userRef);
            setUser(snapshot.data());
            setDataLoading(false);
        })();
    }, []);

    return { dataLoading, data: { user, product } };
};

export default ProductCard;
// FIXME needs to be moved outside of base