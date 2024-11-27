import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const VerificationPage = () => {
    const [isVerifing, setIsVerifing] = useState(true);
    const [isSuccessfulyVerified, setIsSuccessfullyVerified] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsVerifing(false);
            setIsSuccessfullyVerified(true);
        }, 3000)
    }, [isVerifing, isSuccessfulyVerified]);
    return <div className="container mx-auto flex h-full justify-center items-center" >
        <div className="border-2 border-black rounded py-5 px-10 shadow-lg text-center">
            {isVerifing && <p>Please wait as your account is being verified...</p>}
            {isSuccessfulyVerified && <p><i className="pi pi-tick mr-4"></i>Congratulations!<br />Your account is succefully verified!</p>}
            <Link to="/login"><Button label={isVerifing ? "Verifing..." : "Continue to Login"} loading={isVerifing} size="small" /></Link>
        </div>
    </div>
}

export default VerificationPage;