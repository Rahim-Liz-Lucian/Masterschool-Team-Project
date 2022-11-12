import { useRef } from "preact/hooks";

const { log: $ } = console;

const usePage = () => {
    const formRef = useRef();

    function handleSignUp(e) {
        e.preventDefault();
        $("make form request");
        const formData = new FormData(formRef.current);
        $(formData);
    }


    return { formRef, handleSignUp };
};

export default function Page() {
    const { formRef, handleSignUp } = usePage();

    return (
        <div>
            Sign up

            <form ref={formRef} onSubmit={handleSignUp}>
                <label htmlFor="email">
                    <span>Email</span>
                    <input required type="email" name="email" id="email" />
                </label>
                <label htmlFor="password">
                    <span>Password</span>
                    <input required type="password" name="password" id="password" />
                </label>
                <button type="submit">Sign-up</button>
            </form>
        </div>
    );
}