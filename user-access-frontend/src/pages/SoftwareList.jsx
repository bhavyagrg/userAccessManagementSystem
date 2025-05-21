import { useEffect, useState } from 'react';
import { softwareService } from '../services/softwareService';
import { toast } from 'react-toastify';
import '../styles/softwareList.css';

const SoftwareList = () => {
    const [softwares, setSoftwares] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSoftwares = async () => {
        try {
            const data = await softwareService.getAllSoftware();
            setSoftwares(data.softwares);
            setLoading(false);
        } catch (error) {
            toast.error('Failed to fetch software list', {
                position: 'top-right',
                autoClose: 3000,
                theme: 'light',
            });
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSoftwares();
    }, []);

    if (loading) {
        return (
            <div className="auth-container">
                <h2>Loading Softwares...</h2>
            </div>
        );
    }

    return (
        <div className="software-list-container">
            <h2>Software List</h2>
            <div className="software-list">
                {softwares.map((software) => (
                    <div key={software.id} className="software-item">
                        <h3>{software.name}</h3>
                        <p>{software.description}</p>
                        <div className="access-levels">
                            <h4>Access Levels:</h4>
                            <ul>
                                {software.accessLevels.map((level) => (
                                    <li key={level}>{level}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SoftwareList;