export default function ErrorMessage({ error, resetError }) {
    return (
        <div>
            <p>{error.code}</p>
            <p>{error.message}</p>
            <button onClick={resetError}>close</button>
        </div>
    );
}