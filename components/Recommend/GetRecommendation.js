// app/components/Reccomend/GetRecommendation.js
'use client';

import { Toaster } from "@/src/components/ui/sonner";
import { toast } from "sonner";
import { useState } from "react";

import { useUser } from '@/context/UserContext';

import { ref, get, set } from 'firebase/database';

// Firebase の DB からデータを取得するための関数
import { getFirebaseDatabase } from '@/firebaseinit';

function Popup({ Item, setItem }) {
  return (
    <div>
      <div className='fixed top-0 left-0 z-10 h-screen w-screen bg-black/20 -translate-x-4 sm:-translate-x-11 -translate-y-4 sm:-translate-y-11'>
      </div>uu
      <div className="absolute text-base sm:text-xl w-full top-0 left-0 mt-[10vh] z-20 bg-slate-50 border border-gray-300 shadow-lg p-4 sm:p-7 rounded-md duration-500">
        <div className='flex flex-row justify-between gap-2 items-center'>
          <div className='font-bold text-lg sm:text-3xl sm:mb-2'>{Item.name}</div>
          <button onClick={() => setItem(null)}
            className="hover:bg-red-300 text-red-500 text-2xl sm:text-4xl px-2 font-bold rounded -translate-y-1">✕</button>
        </div>
        <div>{Item.date}</div>
        <div>{Item.account} {Item.email}</div>
        <div className='mt-2 overflow-scroll h-[60vh] sm:h-[60vh]
        '>{Item.description}</div>
      </div>
    </div>
  );
}

const getDataref = (db, role, email) => {
    switch (role) {
        case 'engineer':
            return ref(db, 'companies/' + email);
        case 'company':
            return ref(db, 'engineers/' + email);
        default:
            console.error('Invalid "role" value. Must be either "engineer" or "company".');
            return null;
    }
};

export default function GetRecommendation() {
    const [result, setResult] = useState(null);
    const [resultInfo, setResultInfo] = useState([]);
    const [error, setError] = useState('');

    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const { userInfo } = useUser();
    
    const genToken = () => {
        // generete token token は 998244353 の倍数
        const token = Math.floor(Math.random() * 100000) * 998244353;
        return token;
    }

    const fetchDataForEmails = async (emails, role) => {
        const db = getFirebaseDatabase();
        const fetchedData = await Promise.all(
            emails.map(async (item) => {
                const dataRef = getDataref(db, role, Object.keys(item));
                if (dataRef) {
                    const snapshot = await get(dataRef);
                    return snapshot.val();
                }
            return null;
            })
        );
        return fetchedData.filter((item) => item !== null);
    };

    const handleGetRecommendation = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        setResult(null); // Clear previous results
        setResultInfo([]);
        setLoading(true);

        const toastId = toast.loading("Recommendation is being fetched. Please wait...");
        
        // toast.success("Recommendation is being fetched. Please wait...");
        try {
            const token = genToken();
            // console.log(token);
            const response = await fetch('https://findmatches-y6uwyc4xeq-uc.a.run.app/findmatches', {
                // const response = await fetch('http://localhost:5000/jobmatching-38253/us-central1/findmatches', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    role: userInfo.role,
                    userEmail: userInfo.email,
                    token: token,
                })
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Unknown error occurred');
            }

            const data = await response.json();
            setResult(data);
            const fetchedData = await fetchDataForEmails(data, userInfo.role);
            setResultInfo(fetchedData);
            toast.success("Recommendation fetched successfully.", { duration: 3000 });
        } catch (error) {
            if (error.message === "'NoneType' object is not subscriptable") {
                setError("先に情報を登録してください。");
            }else{
                setError(error.message);
            }
        } finally {
            setLoading(false);
            toast.dismiss(toastId);
        }
    };

    return (
        <div>
            <button onClick={handleGetRecommendation}
                className="bg-green-500 disabled:bg-gray-400 text-lg sm:text-2xl  text-white font-bold py-1 px-3 sm:py-2 sm:px-4 rounded-md"
                disabled={loading}>
                Get Recommendation
            </button>
            <div className="text-xl mt-2 sm:mt-4 mx-[-10px]">
                {loading && <p className="font-bold text-2xl mx-[10px]">Loading...</p>}
                {error && <p className="font-bold text-lg text-red-500 mx-[10px]">{error}</p>}
                <ul className="overflow-scroll h-[65vh] sm:h-[60vh]">
                    {result && result.map((resItem, index) => (
                        <li key={index} onClick={() => setSelectedItem(resultInfo[index])}>
                            {/* resultとresultInfoの両方のデータを表示 */}
                            {resultInfo[index] && (
                                <ShowInfo item={resultInfo[index]} percent={Object.values(resItem)}/>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            {selectedItem && <Popup Item={selectedItem} setItem={setSelectedItem} />}
            <Toaster />
        </div>
    );
}

export function ShowInfo({ item, percent }) {
    return (
        <div className="border border-gray-300 p-2 sm:p-4 rounded-md my-2 sm:my-4 cursor-pointer hover:-translate-y-1 duration-700 hover:duration-200 hover:shadow-lg mx-[10px]">
            <div className="flex font-bold text-base sm:text-xl justify-between">
                <div>{item.name}</div>
                <div>{percent}%</div>
            </div>
            {/* <div className="text-lg sm:text-xl">{item.email}</div> */}
            <div className="line-clamp-2 text-sm sm:text-md">{item.description}</div>
        </div>
    );
}