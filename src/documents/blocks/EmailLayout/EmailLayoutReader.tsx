import React from 'react';
import { EmailLayoutProps } from './EmailLayoutPropsSchema';

export default function EmailLayoutReader({ style = {}, props = {} }: EmailLayoutProps) {
  const containerStyle = {
    backgroundColor: style?.backgroundColor ?? '#ffffff',
    padding: style?.padding
      ? `${style.padding.top}px ${style.padding.right}px ${style.padding.bottom}px ${style.padding.left}px`
      : '0',
    maxWidth: '600px',
    margin: '0 auto',
  };

  return (
    <div style={containerStyle}>
      {/* Children will be rendered by the BlockComponent */}
    </div>
  );
}
