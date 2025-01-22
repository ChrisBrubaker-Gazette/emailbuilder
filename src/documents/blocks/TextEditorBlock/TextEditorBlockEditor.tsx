import React from 'react';
import { TextEditorBlockProps } from './TextEditorBlockPropsSchema';
import { Box, styled } from '@mui/material';

const StyledContent = styled(Box)({
  '& a': {
    color: '#1976d2',
    textDecoration: 'underline',
  },
  '& p': {
    margin: 0,
  },
});

export default function TextEditorBlockEditor({ style = {}, props = {} }: TextEditorBlockProps) {
  const containerStyle = {
    backgroundColor: style?.backgroundColor ?? '#ffffff',
    padding: style?.padding
      ? `${style.padding.top}px ${style.padding.right}px ${style.padding.bottom}px ${style.padding.left}px`
      : '24px',
    cursor: 'pointer',
  };

  const contentStyle = {
    color: props.textStyle?.color ?? '#333333',
    fontFamily: props.textStyle?.fontFamily ?? 'Arial, sans-serif',
    fontSize: '16px',
    lineHeight: '1.5',
  };

  return (
    <div style={containerStyle}>
      <StyledContent 
        style={contentStyle}
        dangerouslySetInnerHTML={{ __html: props.content || '' }}
      />
    </div>
  );
}
