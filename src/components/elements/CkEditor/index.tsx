import { Box, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

interface IEditorProps {
  name: string;
  placeholder?: string;
  uploadCredential?: string;
  onChange: (values: string) => void;
  defaultValue?: string;
  error?: string;
}
export const CKEditor: React.FC<IEditorProps> = ({
  name,
  onChange,
  defaultValue,
  error,
}) => {
  const editorRef = useRef<any>();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, //Added .CKEditor
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
    };
    setEditorLoaded(true);
  }, []);

  const [data, setData] = useState(defaultValue);

  return (
    <>
      {editorLoaded ? (
        <Box>
          <Box border={error ? '1px solid red' : 'none'}>
            <CKEditor
              editor={ClassicEditor}
              data={data}
              name={name}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                // console.log('Editor is ready to use!', editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setData(data);
                onChange(data);
              }}
            />
          </Box>
          <Typography fontSize={12} style={{ color: 'red' }}>
            {error}
          </Typography>
        </Box>
      ) : (
        <p>Đang tải...</p>
      )}
    </>
  );
};

export default CKEditor;
