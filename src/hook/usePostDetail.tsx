import { useQuery } from 'react-query';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import postsData from '../mockData/posts.json';
import { FirestoreDocument } from './usePaginationData';

const usePostDetail = (postId: string, useLocalData: boolean) => {
    const fetchPostDetail = async (): Promise<FirestoreDocument | undefined> => {
        if (useLocalData) {
            return postsData.find((post) => post.id === postId);
        }
        const docRef = doc(db, 'posts', postId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as FirestoreDocument;
        }
        return undefined;
    };
    const { data, isLoading, error } = useQuery(['postDetail', postId], fetchPostDetail);

    return { data, isLoading, error };
};

export default usePostDetail;
