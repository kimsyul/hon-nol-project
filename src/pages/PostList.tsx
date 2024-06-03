import { ListContainer, ItemContainer, PostTitle, Info, PostPreview } from '../assets/styles/ListLayout';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';

interface Post {
    id: string;
    title: string;
    content: string;
    region: string;
    theme: string;
}

const PostList = (): JSX.Element => {
    const [posts, setPosts] = useState<Post[]>([]);
    const { category, value } = useParams<{ category?: string; value?: string }>();

    useEffect(() => {
        const fetchPosts = async () => {
            let q;
            if (category && value) {
                q = query(collection(db, 'posts'), where(category, '==', value));
            } else {
                q = collection(db, 'posts');
            }

            const querySnapshot = await getDocs(q);
            const postsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                title: doc.data().title,
                content: doc.data().content.replace(/<\/?[^>]+(>|$)/g, ''),
                region: doc.data().region,
                theme: doc.data().theme,
            }));
            setPosts(postsData);
        };

        fetchPosts();
    }, [category, value]);

    return (
        <ListContainer>
            {posts.map((post) => (
                <ItemContainer key={post.id}>
                    <Link to={`/posts/${post.id}`}>
                        <PostTitle>{post.title}</PostTitle>
                        <PostPreview>{post.content.substring(0, 100)}...</PostPreview>
                        <Info>
                            {post.region} / {post.theme}
                        </Info>
                    </Link>
                </ItemContainer>
            ))}
        </ListContainer>
    );
};

export default PostList;
