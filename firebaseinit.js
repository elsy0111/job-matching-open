// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { firebaseConfig_ } from "@/firebase/functions/secrets/firebaseConfig"; // Firebase設定をインポート


// Firebase Appが初期化されていない場合に初期化する
let firebase_app;

if (!getApps().length) {
  firebase_app = initializeApp(firebaseConfig_);
} else {
  firebase_app = getApps()[0];
}

// getFirebaseDatabase関数: データベースのインスタンスを返す
export const getFirebaseDatabase = () => {
  return getDatabase(firebase_app);
};
