import {
    Query,
    collection,
    query,
    where,
    orderBy,
    startAfter,
    limit,
    DocumentData,
    QueryDocumentSnapshot,
} from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { FirestoreDocument } from '../../hook/usePaginationData';

const buildQuery = (
    collectionName: string,
    searchTerm: string,
    orderField: keyof FirestoreDocument,
    itemsPerPage: number,
    lastDoc: QueryDocumentSnapshot<DocumentData> | null,
): Query => {
    const constraints = [];
    if (searchTerm) {
        const lowerSearchTerm = searchTerm.toLowerCase().trim();
        constraints.push(where('title', '>=', lowerSearchTerm));
        constraints.push(where('title', '<=', lowerSearchTerm + '\uf8ff'));
        constraints.push(where('content', '>=', lowerSearchTerm));
        constraints.push(where('content', '<=', lowerSearchTerm + '\uf8ff'));
    }

    constraints.push(orderBy(orderField));

    if (lastDoc) {
        constraints.push(startAfter(lastDoc));
    }

    constraints.push(limit(itemsPerPage));

    return query(collection(db, collectionName), ...constraints);
};

export default buildQuery;
