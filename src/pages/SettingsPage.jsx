import { Link } from 'react-router-dom';

function SettingsPage () {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <h1 className='text-center text-uppercase mt-5 mb-4'>Settings Page</h1>
            {/* Link to Home Page */}
            <Link to={"/"} className="btn btn-primary mt-4">Back to Home Page</Link>
        </div>
    )
}

export default SettingsPage