import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAMql2W1G--uUhCYpOWiDKQdHWJGRUqE84",
    authDomain: "fir-sample-5b7ab.firebaseapp.com",
    projectId: "fir-sample-5b7ab",
    storageBucket: "fir-sample-5b7ab.appspot.com",
    messagingSenderId: "735359494978",
    appId: "1:735359494978:web:513ec21afcfaf3f88bb6db",
    measurementId: "G-GXZY0L446B"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export const auth = firebase.auth();
export default firebase;

export const getFirebaseItems = async () => {
    try {
        const snapshot = await db
            .collection("todos")
            .get();
        const items = snapshot.docs.map(
            (doc) => ({ ...doc.data(), id: doc.id })
        );
        return items;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export const addFirebaseItem = async (item) => {
    try {
        const todoRef = db.collection("todos");
        await todoRef.add(item);
    } catch (err) {
        console.log(err);
    }
}

export const updateFirebaseItem = async (item, id) => {
    try {
        const todoRef = db.collection("todos").doc(id);
        await todoRef.update(item);
    } catch (err) {
        console.log(err);
    }
}

export const clearFirebaseItem = async (item) => {
    const todoRef = db.collection("todos").doc(item.id);
    await todoRef.delete().then(function () {
    }).catch(function (err) {
        console.log(err);
    });
};

export const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: "/",
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
}

export const storeUserInfo = async (user) => {
    const { uid } = user;
    const userDoc = await db.collection("users").doc(uid).get();
    if (!userDoc.exists) {
        await db.collection("users").doc(uid).set({ name: user.displayName });
        return {
            name: user.displayName,
            id: uid,
        };
    } else {
        return {
            id: uid,
            ...userDoc.data(),
        };
    }
}