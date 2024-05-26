import { useState } from 'react';
import styled from 'styled-components';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Input, Button } from '../components/common/Form';

const categories = {
    region: [
        '서울',
        '경기도',
        '인천',
        '대전',
        '광주',
        '울산',
        '대구',
        '부산',
        '세종',
        '강원도',
        '충청도',
        '경상도',
        '전라도',
        '제주도',
    ],

    theme: ['자연', '문화', '식당', '카페', '축제', '레저', '여행', '기타'],
};

interface Category {
    region: string;
    theme: string;
}

const CreatePost = (): JSX.Element => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [category, setCategory] = useState<Category>({ region: '', theme: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitting post...');

        try {
            await addDoc(collection(db, 'posts'), {
                title,
                content,
                category,
                createAt: new Date(),
            });
            setTitle('');
            setContent('');
            setCategory({ region: '', theme: '' });
            alert('단비같은 정보 공유 감사합니다!');
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };
    return (
        <Form onSubmit={handleSubmit}>
            <Title
                id="title"
                type="text"
                value={title}
                placeholder="제목"
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <SelectContainer>
                <Select
                    id="regionCategory"
                    value={category.region}
                    onChange={(e) => setCategory({ ...category, region: e.target.value })}
                    required
                >
                    <option value="">어떤 지역인가요?</option>
                    {categories.region.map((region) => (
                        <option key={region} value={region}>
                            {region}
                        </option>
                    ))}
                </Select>
                <Select
                    id="themeCategory"
                    value={category.theme}
                    onChange={(e) => setCategory({ ...category, theme: e.target.value })}
                    required
                >
                    <option value="">어떤 테마인가요?</option>
                    {categories.theme.map((theme) => (
                        <option key={theme} value={theme}>
                            {theme}
                        </option>
                    ))}
                </Select>
            </SelectContainer>
            <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required />
            <SubmitButton type="submit">게시하기</SubmitButton>
        </Form>
    );
};

const Title = styled(Input)`
    margin-bottom: 0;
`;

const Form = styled.form`
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    border: none;
    border-radius: 4px;
    height: 100vh;
`;

const Textarea = styled.textarea`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    flex-grow: 1;
    &:focus {
        border-color: #ffabab;
        outline: none;
    }
`;

const SelectContainer = styled.div`
    display: flex;
`;

const Select = styled.select`
    width: 30%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    &:focus {
        border-color: #ffabab;
        outline: none;
    }

    &:first-child {
        margin-right: 10px;
    }
`;

const SubmitButton = styled(Button)`
    width: 100px;
`;

export default CreatePost;
