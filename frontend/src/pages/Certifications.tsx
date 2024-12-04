import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const Certifications = () => {
    const navigate = useNavigate();
    const onSubmit = () => {
        navigate("/projects");
    }
    return <><h1>Certifications</h1>
        <hr />
        <Button type="submit" label='Save & Next'></Button></>
}

export default Certifications;