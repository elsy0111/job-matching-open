import { useUser } from '@/context/UserContext';
export default function Logout(){
    const { setUserInfo } = useUser();  
    
    const handleLogout = () => {
        setUserInfo(null);
        localStorage.removeItem('userInfo');
    };

    return (
        <button onClick={handleLogout} 
            className="fixed text-sm sm:text-lg bottom-0 right-0 px-3 py-2 m-4 border border-gray-200 rounded-md block font-bold bg-red-100 hover:bg-red-400 hover:duration-100 duration-700 hover:scale-105">
            Logout
        </button>
    );
}