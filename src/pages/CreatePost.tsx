import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getStorage, ref as storageRef, uploadString, getDownloadURL } from 'firebase/storage';
import { Title, Form, SelectContainer, Select, SubmitButton } from '../assets/styles/PostStyle';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import { categories } from '../categoryList.tsx';

const CreatePost = (): JSX.Element => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [selectedRegion, setSelectedRegion] = useState<string>('');
    const [selectedSubregion, setSelectedSubregion] = useState<string>('');
    const [selectedTheme, setSelectedTheme] = useState<string>('');

    const quillRef = useRef<ReactQuill | null>(null);

    const handleRegionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const region = e.target.value;
        setSelectedRegion(region);
        setSelectedSubregion('');
    };

    const handleSubregionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedSubregion(e.target.value);
    };

    const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedTheme(e.target.value);
    };

    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                console.log('Mutation detected: ', mutation);
            });
        });

        const config = {
            attributes: true,
            childList: true,
            subtree: true,
        };

        if (quillRef.current) {
            observer.observe(quillRef.current.getEditor().root, config);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

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
        const storage = getStorage();
        const contentRef = storageRef(storage, `contents/${Date.now()}`);

        try {
            const snapshot = await uploadString(contentRef, content, 'raw');
            const downloadURL = await getDownloadURL(snapshot.ref);

            const post = {
                title,
                region: selectedRegion,
                subregion: selectedSubregion,
                theme: selectedTheme,
                contentURL: downloadURL,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            };

            await addDoc(collection(db, 'posts'), post);
            setTitle('');
            setSelectedRegion('');
            setSelectedSubregion('');
            setSelectedTheme('');
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
                <Select id="regionCategory" value={selectedRegion} onChange={handleRegionChange} required>
                    <option value="" disabled>
                        어떤 지역인가요?
                    </option>
                    {Object.entries(categories.regions).map(([key, { name }]) => (
                        <option key={key} value={key}>
                            {name}
                        </option>
                    ))}
                </Select>
                <Select
                    id="subregionCategory"
                    value={selectedSubregion}
                    onChange={handleSubregionChange}
                    disabled={!selectedRegion}
                    required
                >
                    <option value="" disabled>
                        구체적으로 어디인가요?
                    </option>
                    {selectedRegion &&
                        Object.entries(categories.regions[selectedRegion].subregions).map(([key, { name }]) => (
                            <option key={key} value={key}>
                                {name}
                            </option>
                        ))}
                </Select>

                <Select id="themeCategory" value={selectedTheme} onChange={handleThemeChange} required>
                    <option value="" disabled>
                        어떤 테마인가요?
                    </option>
                    {Object.entries(categories.themes).map(([key, { name }]) => (
                        <option key={key} value={key}>
                            {name}
                        </option>
                    ))}
                </Select>
            </SelectContainer>
            <div>
                <Editor
                    ref={quillRef}
                    theme="snow"
                    value={content}
                    onChange={handleEditorChange}
                    modules={modules}
                    formats={formats}
                />
            </div>
            <SubmitButton type="submit">게시하기</SubmitButton>
        </Form>
    );
};

const Editor = styled(ReactQuill)`
    height: 50vh;
    margin-bottom: 40px;
`;

export default CreatePost;
