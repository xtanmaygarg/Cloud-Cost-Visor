import useAuth from './auth';
import useCost from './cost';

const API = () => {
    const auth = useAuth();
    const cost = useCost();

    return { auth, cost };
};

export default API;
