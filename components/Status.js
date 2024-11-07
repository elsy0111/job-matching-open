import { useUser } from '@/context/UserContext';

export default function Status(){
    const { userInfo } = useUser();
    return (
        <div className="fixed bottom-0 left-0 p-4">
            {/* if userInfo is null , instead of NULL */}
            <div className="text-sm sm:text-lg"><span className='sm:text-xl font-bold'> {userInfo ? userInfo.name : 'NULL'} </span> さんこんにちは！</div>
            <div className="text-sm sm:text-lg"> {userInfo ? userInfo.email : 'NULL'} as <span className="sm:text-lg uppercase font-bold text-green-700"> {userInfo ? userInfo.role : 'NULL'} </span></div>
        </div>
    );
}