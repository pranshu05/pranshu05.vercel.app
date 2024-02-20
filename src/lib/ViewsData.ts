import { db } from '../firebase/firebase';
import { collection, doc, getDoc, setDoc, serverTimestamp, updateDoc } from 'firebase/firestore';

const viewsCollection = collection(db, 'views');

export async function getViewCount(slug: string): Promise<number> {
    const viewsDoc = doc(viewsCollection, slug);

    try {
        const docSnapshot = await getDoc(viewsDoc);
        return docSnapshot.exists() ? docSnapshot.data().count : 0;
    } catch (error) {
        console.error('Error getting view count:', error);
        return 0;
    }
}

export async function incrementViewCount(slug: string): Promise<void> {
    const viewsDoc = doc(viewsCollection, slug);

    try {
        const docSnapshot = await getDoc(viewsDoc);

        if (docSnapshot.exists()) {
            await updateDoc(viewsDoc, {
                count: docSnapshot.data().count + 1,
            });
        } else {
            await setDoc(viewsDoc, {
                count: 1,
                lastUpdated: serverTimestamp(),
            });
        }
    } catch (error) {
        console.error('Error incrementing view count:', error);
    }
}