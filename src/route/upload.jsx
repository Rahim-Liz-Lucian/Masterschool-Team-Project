import Compressor from "compressorjs";
import { collection } from "firebase/firestore";
import { useEffect, useState } from "preact/hooks";
import ErrorMessage from "../component/base/ErrorMessage";
import { uploadFile, uploadProduct } from "../firebase/functions";
import { useFirebaseAuth, useFirebaseCollectionData } from "../firebase/hooks";
import { useError } from "../utils/hooks";
import Back from "../component/base/Back";
import Button from "../component/base/Button";

export default function Page() {
  const [auth, authLoading] = useFirebaseAuth();
  const { onUpload, products, dataLoading, error, resetError } = use({ auth });

  if (authLoading || dataLoading) return <div>Loading...</div>;

  if (error)
    return (
      <>
        <Back />
        <ErrorMessage {...{ error, resetError }} />
      </>
    );

  if (!auth)
    return (
      <div>
        <Back />
        <p>Restricted path</p>
      </div>
    );

  return (
    <div className="page">
      <h1>Upload Product</h1>
      <Back />
      <p>I have {products.length} Products in my basket</p>

      <ProductUploadForm onUpload={onUpload} />
    </div>
  );
}

const use = ({ auth: user }) => {
  const { error, setError, resetError } = useError();

  // products
  const [products, productsError, productsLoading] = useFirebaseCollectionData(
    (store) => {
      return collection(store, `users/${user?.uid}/products`);
    },
    [user]
  );

  useEffect(() => {
    productsError && setError(productsError);
  }, [productsError]);

  const onUpload = async ({
    title,
    description,
    expirationDate,
    thumbnail,
  }) => {
    const product = {
      title,
      expirationDate,
      uid: crypto.randomUUID(),
      description: description ?? ``,
    };

    new Compressor(thumbnail, {
      quality: 0.6,
      maxWidth: 1500,
      maxHeight: 1000,
      error(error) {
        setError(error);
      },
      async success(file) {
        try {
          const thumbnailURL = await uploadFile(
            file,
            `users/${user?.uid}/images/products/${product.uid}`
          );
          await uploadProduct(user, { ...product, thumbnailURL });
          alert(`Product has been uploaded 💚`);
        } catch (error) {
          setError(error);
        }
      },
    });
  };

  return {
    error,
    resetError,
    onUpload,
    products,
    dataLoading: productsLoading,
  };
};

function ProductUploadForm({ onUpload }) {
  const [product, setProduct] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();

    onUpload(product);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="input-control">
          <label htmlFor="title">Title</label>
          <input
            required
            type="text"
            name="title"
            id="title"
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
          />
        </div>
        <div className="input-control">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />
        </div>

        <div className="input-control">
          <label htmlFor="expirationDate">Expiration Date</label>
          <input
            required
            type="date"
            name="expirationDate"
            id="expirationDate"
            onChange={(e) =>
              setProduct({ ...product, expirationDate: e.target.value })
            }
          />
        </div>

        <div className="input-control file-upload">
          <label htmlFor="thumbnail"> Upload Image</label>
          <input
            required
            type="file"
            name="thumbnail"
            id="thumbnail"
            onChange={(e) =>
              setProduct({ ...product, thumbnail: e.target.files[0] })
            }
          />
        </div>
        <Button type="submit" classes="btn btn-primary">
          Upload Product
        </Button>
      </form>
    </>
  );
}
