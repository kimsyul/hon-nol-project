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
    const [selectedSubtheme, setSelectedSubtheme] = useState<string>('');
    const [regionName, setRegionName] = useState<string>('');
    const [subregionName, setSubregionName] = useState<string>('');
    const [themeName, setThemeName] = useState<string>('');
    const [subthemeName, setSubthemeName] = useState<string>('');
    const { currentUser } = useContext(FirebaseContext);

    const quillRef = useRef<ReactQuill | null>(null);

    const handleRegionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const region = e.target.value;
        setSelectedRegion(region);
        setSelectedSubregion('');
        setRegionName(categories.regions[region].name);
    };

    const handleSubregionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const subregion = e.target.value;
        setSelectedSubregion(subregion);
        setSubregionName(categories.regions[selectedRegion].subregions[subregion].name);
    };

    const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const theme = e.target.value;
        setSelectedTheme(theme);
        setThemeName(categories.themes[theme].name);
    };

    const handleSubthemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const subtheme = e.target.value;
        setSelectedSubtheme(subtheme);
        setSubthemeName(categories.themes[selectedTheme].subthemes[subtheme].name);
    };

    const handleEditorChange = (value: string) => {
        setContent(value);
    };

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
            regionName: regionName,
            subregion: selectedSubregion,
            subregionName: subregionName,
            theme: selectedTheme,
            themeName: themeName,
            subtheme: selectedSubtheme,
            subthemeName: subthemeName,
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
            setSelectedSubtheme('');
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
                        오 그 중 어디에요?
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

                <Select
                    id="subthemeCategory"
                    value={selectedSubtheme}
                    onChange={handleSubthemeChange}
                    disabled={!selectedTheme}
                    required
                >
                    <option value="" disabled>
                        궁금한데 더 자세히요!
                    </option>
                    {selectedTheme &&
                        Object.entries(categories.themes[selectedTheme].subthemes).map(([key, { name }]) => (
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
