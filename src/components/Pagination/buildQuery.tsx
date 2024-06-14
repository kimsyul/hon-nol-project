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

interface Filter {
    field: string;
    value: string;
}

const buildQuery = (
    collectionName: string,
    fieldFilters: Filter[],
    orderField: string,
    itemsPerPage: number,
    lastDoc: QueryDocumentSnapshot<DocumentData> | null,
): Query<DocumentData> => {
    let q = query(collection(db, collectionName), orderBy(orderField));

    fieldFilters.forEach((filter) => {
        q = query(q, where(filter.field, '==', filter.value));
    });

    if (lastDoc) {
        q = query(q, startAfter(lastDoc));
    }

    return query(q, limit(itemsPerPage));
};

export default buildQuery;
