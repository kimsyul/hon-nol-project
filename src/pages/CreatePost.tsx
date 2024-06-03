import { useState, useRef, ChangeEvent, useContext } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import { Title, Form, SelectContainer, Select, SubmitButton } from '../assets/styles/PostStyle';
import { categories } from '../categoryList.tsx';
import { FirebaseContext } from '../FirebaseContext.tsx';

const CreatePost = (): JSX.Element => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [selectedRegion, setSelectedRegion] = useState<string>('');
    const [selectedSubregion, setSelectedSubregion] = useState<string>('');
    const [selectedTheme, setSelectedTheme] = useState<string>('');
    const { currentUser } = useContext(FirebaseContext);

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

    const handleEditorChange = (value: string) => {
        setContent(value);
    };

    // // 포맷 가져오기
    // const Font = Quill.import('formats/font');
    // const Size = Quill.import('attributors/style/size');
    // const Blockquote = Quill.import('formats/blockquote');
    // const CodeBlock = Quill.import('formats/code-block');

    // // 폰트 및 사이즈 화이트리스트 설정
    // Font.whitelist = ['sans-serif', 'serif', 'monospace'];
    // Size.whitelist = ['small', 'large', 'huge'];

    // // Quill에 포맷 등록
    // Quill.register(
    //     {
    //         'formats/font': Font,
    //         'attributors/style/size': Size,
    //         'formats/blockquote': Blockquote,
    //         'formats/code-block': CodeBlock,
    //     },
    //     true,
    // );

    // const modules = {
    //     toolbar: [
    //         [{ font: Font.whitelist }],
    //         [{ size: Size.whitelist }],
    //         ['bold', 'italic', 'underline', 'strike'],
    //         ['blockquote', 'code-block'],
    //         [{ list: 'ordered' }, { list: 'bullet' }],
    //         [{ indent: '-1' }, { indent: '+1' }],
    //         [{ align: [] }],
    //         ['clean'],
    //     ],
    // };

    // const formats = [
    //     'header',
    //     'bold',
    //     'italic',
    //     'underline',
    //     'strike',
    //     'align',
    //     'list',
    //     'bullet',
    //     'link',
    //     'image',
    //     'color',
    //     'background',
    // ];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!currentUser) {
            console.log('No user logged in');
            return;
        }

        const post = {
            title,
            content: content,
            region: selectedRegion,
            subregion: selectedSubregion,
            theme: selectedTheme,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            authorId: currentUser.uid,
        };

        try {
            await addDoc(collection(db, 'posts'), post);
            setTitle('');
            setContent('');
            setSelectedRegion('');
            setSelectedSubregion('');
            setSelectedTheme('');
            alert('단비같은 정보 공유 감사합니다!');
        } catch (error) {
            console.error('Error adding document: ', error);
            alert('게시글 등록에 실패했습니다.ㅠ_ㅠ');
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
                    // modules={modules}
                    // formats={formats}
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
