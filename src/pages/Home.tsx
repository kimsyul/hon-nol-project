import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Home: React.FC = () => {
    return (
        <HomeContainer>
            <Section>
                <SectionTitle>주요 카테고리</SectionTitle>
                <Categories>
                    <CategoryCard>
                        <Link to="/posts?category=1">카테고리 1</Link>
                    </CategoryCard>
                    <CategoryCard>
                        <Link to="/posts?category=2">카테고리 2</Link>
                    </CategoryCard>
                    <CategoryCard>
                        <Link to="/posts?category=3">카테고리 3</Link>
                    </CategoryCard>
                </Categories>
            </Section>
            <Section>
                <SectionTitle>추천 게시글</SectionTitle>
                <PostList>
                    <PostCard>
                        <Link to="/post/1">추천 게시글 1</Link>
                    </PostCard>
                    <PostCard>
                        <Link to="/post/2">추천 게시글 2</Link>
                    </PostCard>
                    <PostCard>
                        <Link to="/post/3">추천 게시글 3</Link>
                    </PostCard>
                </PostList>
            </Section>
            <Section>
                <SectionTitle>최근 게시글</SectionTitle>
                <PostList>
                    <PostCard>
                        <Link to="/post/4">최근 게시글 1</Link>
                    </PostCard>
                    <PostCard>
                        <Link to="/post/5">최근 게시글 2</Link>
                    </PostCard>
                    <PostCard>
                        <Link to="/post/6">최근 게시글 3</Link>
                    </PostCard>
                </PostList>
            </Section>
        </HomeContainer>
    );
};

const HomeContainer = styled.div`
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
`;

const Section = styled.section`
    margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
    font-size: 24px;
    margin-bottom: 20px;
`;

const Categories = styled.div`
    display: flex;
    gap: 20px;
`;

const CategoryCard = styled.div`
    flex: 1;
    padding: 20px;
    background: #f0f0f0;
    border-radius: 8px;
    text-align: center;

    a {
        text-decoration: none;
        color: #333;
        font-weight: bold;
    }

    &:hover {
        background: #e0e0e0;
    }
`;

const PostList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const PostCard = styled.div`
    padding: 15px;
    background: #fafafa;
    border: 1px solid #ddd;
    border-radius: 8px;

    a {
        text-decoration: none;
        color: #007bff;
    }

    &:hover {
        background: #f0f0f0;
    }
`;

export default Home;
