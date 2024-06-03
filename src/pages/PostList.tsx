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
    subregion: string;
    theme: string;
}

const PostList = (): JSX.Element => {
    const { regionId, subregionId, themeId } = useParams();
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            let q;
            if (subregionId) {
                q = query(collection(db, 'posts'), where('subregion', '==', subregionId));
            } else if (regionId) {
                q = query(collection(db, 'posts'), where('region', '==', regionId));
            } else if (themeId) {
                q = query(collection(db, 'posts'), where('theme', '==', themeId));
            } else {
                q = collection(db, 'posts');
            }

            const querySnapshot = await getDocs(q);
            const postsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                title: doc.data().title,
                content: doc.data().content.replace(/<\/?[^>]+(>|$)/g, ''),
                region: doc.data().region,
                subregion: doc.data().subregion,
                theme: doc.data().theme,
            }));
            setPosts(postsData);
        };

        fetchPosts();
    }, [regionId, subregionId, themeId]);

    return (
        <ListContainer>
            {posts.map((post) => (
                <ItemContainer key={post.id}>
                    <Link to={`/posts/${post.id}`}>
                        <PostTitle>{post.title}</PostTitle>
                        <PostPreview>{post.content.substring(0, 100)}...</PostPreview>
                        <Info>
                            {post.region} - {post.subregion} / {post.theme}
                        </Info>
                    </Link>
                </ItemContainer>
            ))}
        </ListContainer>
    );
};

export default PostList;
