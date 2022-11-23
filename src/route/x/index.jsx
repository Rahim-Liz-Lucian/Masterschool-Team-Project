import { collection } from "firebase/firestore";
import { useEffect } from "preact/hooks";
import styled from "styled-components";
import { Redirect } from "wouter-preact";
import { Nav } from "~/component/base/base";
import ErrorMessage from "~/component/base/ErrorMessage";
import { useFireBaseAuth } from "~/firebase/data";
import { useFirebaseCollectionData } from "~/firebase/hooks";
import { useError } from "~/utils/hooks";

export default function Page() {
    const user = useFireBaseAuth();
    const { error, resetError, products, dataLoading } = useHook({ user });

    if (!user) return <Redirect to="/x/sign-in" />;

    if (error) return <ErrorMessage {...{ error, resetError }} />;

    if (dataLoading) return (
        <div>Data loading..</div>
    );

    return (
        <Container>
            <div>
                <h1>Browse</h1>
                <button>List View</button>
                <button>Map View</button>
            </div>

            <div>My Products Quantity: {products.length}</div>

            <Nav />
        </Container>
    );
}

const useHook = ({ user }) => {
    const { error, setError, resetError } = useError();

    const [products, productsError, productsLoading] = useFirebaseCollectionData(store => {
        return collection(store, `users/${user.uid}/products`);
    }, [user]);

    useEffect(() => { setError(productsError); }, [productsError]);

    return { error, resetError, products, dataLoading: productsLoading };
};

const Container = styled.div`
    outline: 1px solid magenta;
    width: 390px;
    height: 100vh;
`;

