import { useState } from 'react';
import { ref, set, get, remove } from 'firebase/database';
import { getFirebaseDatabase } from '@/firebaseinit';

import { useUser } from '@/context/UserContext';

import { Toaster } from '@/src/components/ui/sonner';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { onValue } from 'firebase/database';

import Loading from '@/components/Loading';

const getDatarefRemove = (db, role, itemName) => {
    switch (role) {
        case 'company':
            return ref(db, 'companies/' + itemName);
        case 'engineer':
            return ref(db, 'engineers/' + itemName);
        default:
            console.error('Invalid "role" value. Must be either "engineer" or "company".');
            return null;
    }
}

const deleteItem = async (role, ID, setName, setDescription, setAlreadySent) => {
    const db = getFirebaseDatabase();
    const dataRef = getDatarefRemove(db, role, ID);
    
    console.log(dataRef);

    const snapshot = await get(dataRef);
    if (!snapshot.exists()) {
        toast.error('Error: Item not found');
        return;
    }

    remove(dataRef)
        .then(() => {
            toast.success('Item deleted successfully.');
            setName('');
            setDescription('');
            setAlreadySent(false);
        })
        .catch((error) => toast.error('Error deleting item', error));
};

export default function SendForm() {
    const { userInfo } = useUser();
    const role = userInfo.role;
    const email = userInfo.email;
    const ufname = userInfo.name;
    // const role = "company";
    // const email = "company6@test_gmail_com";
    // const ufname = "FFF株式会社";


    const [loading, setLoading] = useState(true);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [alreadySent, setAlreadySent] = useState(false);

    // もし送っていたデータがあれば、それをフォームに表示
    useEffect(() => {
        const db = getFirebaseDatabase();
        let userRef;
        
        if (role === 'engineer') {
            userRef = ref(db, 'engineers/' + email);
        } else if (role === 'company') {
            userRef = ref(db, 'companies/' + email);
        }
        
        if (!userRef) {
            setLoading(false);
            return;
        }

        const unsubscribe = onValue(userRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setDescription(data.description || '');
                setName(data.name || '');
                setAlreadySent(true);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [userInfo, role, setAlreadySent]);
    
    if (loading) {
        return (
            <Loading />
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Firebaseデータベースの参照を取得
        const db = getFirebaseDatabase();
        let userRef;

        // who_buttonの値に基づいてデータベースの参照を設定
        if (role === 'engineer') {
            userRef = ref(db, 'engineers/' + email);  // engineers/ユーザー名
        } else if (role === 'company') {
            userRef = ref(db, 'companies/' + email);  // companies/ユーザー名
        }

        // データをFirebaseにセット
        set(userRef, {
            name: name,
            description: description,
            email: email,
            account: ufname,
            date: new Date().toLocaleString()
        }).then(() => {
            // フォームをクリア
            toast.success('Data sent to DB!');
            // setName('');
            // setDescription('');
        }).catch((error) => {
            toast.error('Error writing to database', error);
        });
    };
    const handleDelete = (e) => {
        deleteItem(role, email, setName, setDescription, setAlreadySent);
    }

    return (
        <div>
            <div className="w-full mx-auto">
                {/* Name入力欄 */}
                <div className="mb-2 sm:mb-3">
                    <label className="block text-gray-700 text-lg sm:text-2xl font-bold mb-1 sm:mb-3" htmlFor="name">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={role === 'engineer' ? 'Enter your name' : 'Enter company name'}
                        className="text-sm sm:text-base shadow appearance-none border rounded w-full p-2 sm:p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                {/* Description入力欄 */}
                <div className="mb-2 sm:mb-3">
                    <label className="block text-gray-700 text-lg sm:text-2xl font-bold mb-1 sm:mb-3" htmlFor="description">
                        {role === 'engineer' ? 'Your Tech Stack' : 'Required Abilities'}
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={role === 'engineer' ? 'Enter your tech stack' : 'Enter required abilities'}
                        className="text-sm sm:text-base shadow h-[46vh] resize-none appearance-none border rounded w-full p-2 sm:p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="flex justify-between">
                    {/* Sendボタン */}
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={!name || !description}
                        className="bg-blue-500 hover:bg-blue-700 text-white disabled:bg-gray-400 disabled:text-gray-100 text-md font-bold py-2 px-4 rounded focus:outline-none hover:scale-105 hover:duration-200 duration-500"
                    >
                        Send as {role}
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-100 hover:bg-red-200 text-red-500 disabled:bg-gray-400 disabled:text-gray-100 text-lg sm:text-2xl font-bold px-4 rounded focus:outline-none hover:scale-105 hover:duration-200 duration-500"
                        disabled={!alreadySent}
                    >
                        <p className='-translate-y-[2px]'>募集を削除</p>
                    </button>
                </div>
            </div>
            <Toaster />
        </div>
    );
}