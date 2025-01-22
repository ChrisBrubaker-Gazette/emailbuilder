import React from 'react';
import { TextEditorBlockProps } from './TextEditorBlockPropsSchema';

export default function TextEditorBlockReader({ style = {}, props = {} }: TextEditorBlockProps) {
  const containerStyle = {
    backgroundColor: style?.backgroundColor,
    padding: style?.padding
      ? `${style.padding.top}px ${style.padding.right}px ${style.padding.bottom}px ${style.padding.left}px`
      : undefined,
  };

  const textStyle = {
    margin: 0,
    fontFamily: props.textStyle?.fontFamily,
    color: props.textStyle?.color,
  };

  return (
    <div style={containerStyle}>
      <div 
        style={textStyle}
        dangerouslySetInnerHTML={{ __html: props.content || '' }}
      />
    </div>
  );
}
