import {
    ListContainer,
    ItemContainer,
    ImagePreview,
    TextContainer,
    PostTitle,
    PostPreview,
    Info,
} from '../assets/styles/ListLayout';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

interface Post {
    id: string;
    title: string;
    content: string;
    imageUrl?: string;
    region: string;
    theme: string;
}

const PostList = (): JSX.Element => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const querySnapshot = await getDocs(collection(db, 'posts'));
            const postsData = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                console.log(data.createdAt);
                return { id: doc.id, ...data };
            }) as Post[];
            setPosts(postsData);
        };

        fetchPosts();
    }, []);

    return (
        <ListContainer>
            {posts.map((post) => (
                <PostItem key={post.id} post={post} />
            ))}
        </ListContainer>
    );
};

const PostItem: React.FC<{ post: Post }> = ({ post }) => {
    const previewContent = post.content.length > 100 ? post.content.substring(0, 100) + '...' : post.content;

    return (
        <ItemContainer>
            <Link to={`/posts/${post.id}`}>
                <ImagePreview src={post.imageUrl || 'default-image.png'} alt="Preview" />
                <TextContainer>
                    <PostTitle>{post.title}</PostTitle>
                    <PostPreview>{previewContent}</PostPreview>
                    <Info>
                        {post.region} - {post.theme} -{' '}
                    </Info>
                </TextContainer>
            </Link>
        </ItemContainer>
    );
};

export default PostList;
