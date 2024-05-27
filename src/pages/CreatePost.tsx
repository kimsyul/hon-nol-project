import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Title, Form, SelectContainer, Select, SubmitButton } from '../assets/styles/PostStyle';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ align: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            [{ color: [] }, { background: [] }],
            ['clean'],
        ],
        clipboard: {
            matchVisual: false,
        },
    };

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'align',
        'list',
        'bullet',
        'link',
        'image',
        'color',
        'background',
    ];

    const handleEditorChange = (value: string) => {
        setContent(value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Submitting post...');

        const post = {
            title,
            category,
            content: content,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        };

        try {
            await addDoc(collection(db, 'posts'), post);
            setTitle('');
            setCategory({ region: '', theme: '' });
            setContent('');
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
                    onChange={(e) => setCategory({ ...category, region: e.currentTarget.value })}
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
                    onChange={(e) => setCategory({ ...category, theme: e.currentTarget.value })}
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
            <ReactQuill
                theme="snow"
                value={content}
                onChange={handleEditorChange}
                modules={modules}
                formats={formats}
            />
            <SubmitButton type="submit">게시하기</SubmitButton>
        </Form>
    );
};

export default CreatePost;
