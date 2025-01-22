import React, { useState, useCallback } from 'react';
import { Box, Stack, TextField, Button, styled } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import InsertLinkIcon from '@mui/icons-material/InsertLink';

interface TextEditorBlockSidebarPanelProps {
  data: any;
  setData: (data: any) => void;
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    lineHeight: '1.5',
  },
  '& .MuiOutlinedInput-root': {
    padding: theme.spacing(2),
    minHeight: '100px',
    alignItems: 'flex-start',
  },
}));

const FormatButton = styled(Button)(({ theme }) => ({
  minWidth: '40px',
  padding: theme.spacing(1),
  marginRight: theme.spacing(1),
}));

export default function TextEditorBlockSidebarPanel({ data, setData }: TextEditorBlockSidebarPanelProps) {
  const [text, setText] = useState(data.props.content || '');
  
  const updateContent = useCallback((newContent: string) => {
    setText(newContent);
    setData({
      ...data,
      props: {
        ...data.props,
        content: newContent,
      },
    });
  }, [data, setData]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateContent(e.target.value);
  };

  const handleFormat = (format: string) => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = text.substring(start, end);
    
    let formattedText = text;
    if (selectedText) {
      let replacement = '';
      switch (format) {
        case 'bold':
          replacement = `<strong>${selectedText}</strong>`;
          break;
        case 'italic':
          replacement = `<em>${selectedText}</em>`;
          break;
        case 'underline':
          replacement = `<u>${selectedText}</u>`;
          break;
        case 'link':
          const url = prompt('Enter URL:');
          if (url) {
            replacement = `<a href="${url}" target="_blank" rel="noopener noreferrer">${selectedText}</a>`;
          } else {
            return;
          }
          break;
      }
      formattedText = text.substring(0, start) + replacement + text.substring(end);
      updateContent(formattedText);
      
      // Restore cursor position
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start, start + replacement.length);
      }, 0);
    }
  };

  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      <Box>
        <FormatButton
          onClick={() => handleFormat('bold')}
          variant="outlined"
          size="small"
        >
          <FormatBoldIcon />
        </FormatButton>
        <FormatButton
          onClick={() => handleFormat('italic')}
          variant="outlined"
          size="small"
        >
          <FormatItalicIcon />
        </FormatButton>
        <FormatButton
          onClick={() => handleFormat('underline')}
          variant="outlined"
          size="small"
        >
          <FormatUnderlinedIcon />
        </FormatButton>
        <FormatButton
          onClick={() => handleFormat('link')}
          variant="outlined"
          size="small"
        >
          <InsertLinkIcon />
        </FormatButton>
      </Box>
      <StyledTextField
        multiline
        fullWidth
        value={text}
        onChange={handleTextChange}
        placeholder="Type your text here..."
        variant="outlined"
      />
    </Stack>
  );
}
