import ErrorMessage from "../errorMessage/ErrorMessage";
import {Link} from "react-router-dom";

const Page404 = () => {
    return (
        <>
            <ErrorMessage/>
            <h2 style={{textAlign: "center"}} >Page doesn't exist</h2>
            <Link style={{display: "block", textAlign: "center"}} to="/" >
                Back to main page
            </Link>
        </>
    )
}

export default Page404
