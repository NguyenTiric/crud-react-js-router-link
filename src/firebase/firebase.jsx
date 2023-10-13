import {initializeApp} from "firebase/app";
import {getStorage, ref, uploadBytes, getDownloadURL, deleteObject} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDB3kpuH87nSC-AeUpWZVOVbJszmtwoGvc",
    authDomain: "anhsanpham-af42b.firebaseapp.com",
    projectId: "anhsanpham-af42b",
    storageBucket: "anhsanpham-af42b.appspot.com",
    messagingSenderId: "471420255218",
    appId: "1:471420255218:web:b436a96337732392ce896b"
};


async function saveFile(imagetoUpload) {

    if (imagetoUpload == null) return;

    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    let imageRef = ref(storage, `images/${imagetoUpload.name}`);

    let snapshot = await uploadBytes(imageRef, imagetoUpload);

    imageRef = ref(storage, snapshot.metadata.fullPath);
    let url = await getDownloadURL(imageRef);
    return url;
};


async function getFile() {

    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const imageRef = ref(storage, `images/img1.jpg`);

    let url = await getDownloadURL(imageRef);
    return url;
};


async function deleteFile(imagePath) {

    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const imageRef = ref(storage, imagePath);

    deleteObject(imageRef).then(() => {
        // File deleted successfully
    }).catch((error) => {
        // Uh-oh, an error occurred!
    });
};

export {saveFile, getFile, deleteFile};