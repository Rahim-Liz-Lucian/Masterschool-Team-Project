import { changePassword, changeEmail } from "../firebase/functions"
import { useState } from "preact/hooks";
const ChangePassword = () => {

    const [newPassword, setNewPassword] = useState("")
    const [newPasswordRepeat, setNewPasswordRepeat] = useState("")

    const [newEmail, setNewEmail] = useState("")
    const [newEmailRepeat, setNewEmailRepeat] = useState("")

    return ( 
    <>
        New Password: <input type="password" value={newPassword} onChange={(e) => {setNewPassword(e.target.value)}}/>
        Repeat new Password: <input  type="password" value={newPasswordRepeat} onChange={(e) => {setNewPasswordRepeat(e.target.value)}}/>
        <button onClick={() => {
            if (newPassword && newPassword === newPasswordRepeat) {
                changePassword(newPassword)
            }
        }}>Change Password now</button>
        <br/>
        New Email: <input type="email" value={newEmail} onChange={(e) => {setNewEmail(e.target.value)}}/>
        Repeat new Email: <input  type="email" value={newEmailRepeat} onChange={(e) => {setNewEmailRepeat(e.target.value)}}/>
        <button onClick={() => {
            if (newEmail && newEmail === newEmailRepeat) {
                changeEmail(newEmail)
            }
        }}>Change Email now</button>
    </> 
    );
}
 
export default ChangePassword;