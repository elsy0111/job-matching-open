import Header from '@/components/Header';

import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';

// Firebase の DB からデータを取得するための関数
import { getFirebaseDatabase } from '@/firebaseinit';

// import { useUser } from '@/context/UserContext';

import Loading from '@/components/Loading';

// Firebase の DB からデータを取得・表示するコンポーネント
export default function GetList({ role }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getFirebaseDatabase();
    let dataRef = getDataref(db, role);

    if (!dataRef) {
      setLoading(false);
      return;
    }

    // Listen for changes in the data
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      const itemsList = data ?
        Object.keys(data).map((key) => ({ name: key, ...data[key] })) :
        [];
      setItems(itemsList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [role]);

  if (loading) {
    return (
      <Loading />
    );
  }
  return (
    <>
      <Header>{role === 'engineer' ? 'Recruitment List' : 'Application List'}</Header>
      <ItemsList items={items} role={role} />
    </>
  );
}

const getDataref = (db, role) => {
  switch (role) {
    case 'engineer':
      return ref(db, 'companies');
    case 'company':
      return ref(db, 'engineers');
    default:
      console.error('Invalid "role" value. Must be either "engineer" or "company".');
      return null;
  }
};

// const getDatarefRemove = (db, role, itemName) => {
//   switch (role) {
//     case 'engineer':
//       return ref(db, 'companies/' + itemName);
//     case 'company':
//       return ref(db, 'engineers/' + itemName);
//     default:
//       console.error('Invalid "role" value. Must be either "engineer" or "company".');
//       return null;
//   }
// }

// // Delete an item from Firebase
// const deleteItem = async (role, ID) => {
//   const db = getFirebaseDatabase();
//   const dataRef = getDatarefRemove(db, role, ID);

//   const snapshot = await get(dataRef);
//   if (!snapshot.exists()) {
//     toast.error('Error: Item not found');
//     return;
//   }

//   remove(dataRef)
//     .then(() => toast.success('Item deleted successfully.'))
//     .catch((error) => toast.error('Error deleting item', error));
// };

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

// Component to list items
function ItemsList({ items, role }) {
  // const { userInfo } = useUser();
  const [selectedItem, setSelectedItem] = useState(null);

  if (typeof window === 'undefined') return null;

  const handleItemClick = (item) => {
    setSelectedItem(item);
  }
  
  return (
    <div className="h-3/4 overflow-scroll">
      {items.length > 0 ? (
        <ul className="mt-2 sm:mt-1 flex flex-col gap-3 sm:gap-4">
          {items.map((item) => (
            <li
              key={item.name}
              onClick={() => handleItemClick(item)}
              className="relative cursor-pointer shadow-md p-3 sm:p-4 border rounded-md hover:-translate-y-1 hover:duration-200 duration-700"
            >
              <div className="flex flex-row gap-1 sm:gap-2 items-center">
                <div className="text-base sm:text-xl text-gray-800">
                  <strong>Name:</strong> {item.name} <br />
                </div>
                <div className='flex-grow' />
                <div className="text-sm text-gray-500">
                  {/* {item.account} */}
                  {/* {item.email} */}
                  {item.date.slice(0, -3)}
                </div>
                {/* Delete Button */}
                {/* {(userInfo.email === item.email) && (
                  <button
                    onClick={() => deleteItem(role, userInfo.email)}
                    className="border px-2 hover:bg-red-300 text-red-500 text-2xl font-bold rounded -translate-y-1"
                  >
                    <p className='-translate-y-[2px]'>×</p>
                  </button>
                )} */}
              </div>
              <div className="text-md sm:text-xl text-gray-800 mt-1 sm:mt-2 line-clamp-3">
                <strong>{role === 'engineer' ? 'Tech Stack' : 'Description'}: </strong> 
                <p className='text-gray-500 inline text-sm sm:text-lg'>{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-gray-600">
          No {RevRole(role)} found
        </div>
      )}
      {selectedItem && <Popup Item={selectedItem} setItem={setSelectedItem} />}
    </div>
  );
}

function RevRole(role) {
  switch (role) {
    case 'engineer':
      return 'company';
    case 'company':
      return 'engineer';
    default:
      console.error('Invalid "role" value. Must be either "engineer" or "company".');
      return null;
  }
}