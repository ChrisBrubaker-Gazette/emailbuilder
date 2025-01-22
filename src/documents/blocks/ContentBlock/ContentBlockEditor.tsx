import React from 'react';
import { Image } from '@usewaypoint/block-image';
import { Container } from '@usewaypoint/block-container';

import { useCurrentBlockId } from '../../editor/EditorBlock';
import { setDocument, useDocument } from '../../editor/EditorContext';
import { ContentBlockProps } from './ContentBlockPropsSchema';

export default function ContentBlockEditor({ style, props }: ContentBlockProps) {
  const document = useDocument();
  const currentBlockId = useCurrentBlockId();

  const handleChange = (newProps: ContentBlockProps['props']) => {
    setDocument({
      [currentBlockId]: {
        type: 'ContentBlock',
        data: {
          style,
          props: newProps,
        },
      },
    });
  };

  const containerStyle = {
    backgroundColor: style?.backgroundColor,
    padding: style?.padding
      ? `${style.padding.top}px ${style.padding.right}px ${style.padding.bottom}px ${style.padding.left}px`
      : undefined,
  };

  const headingStyle = {
    margin: '0 0 16px 0',
    fontSize: '24px',
    fontWeight: 'bold',
    fontFamily: props?.headingStyle?.fontFamily || 'inherit',
    color: props?.headingStyle?.color || '#333333',
    textAlign: props?.headingStyle?.textAlign || 'left',
  };

  const paragraphStyle = {
    margin: '0 0 20px 0',
    fontSize: '16px',
    lineHeight: '1.5',
    fontFamily: props?.paragraphStyle?.fontFamily || 'inherit',
    color: props?.paragraphStyle?.color || '#666666',
    textAlign: props?.paragraphStyle?.textAlign || 'left',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
    cursor: 'pointer',
  };

  const imageStyle = {
    outline: 'none',
    border: 'medium',
    textDecoration: 'none',
    verticalAlign: 'middle',
    display: 'inline-block',
    width: '100%',
    objectFit: 'contain'
  };

  const buttonUrl = props?.button?.href || '#';

  return (
    <Container style={containerStyle}>
      {props?.image?.props?.url && (
        <a href={buttonUrl} style={linkStyle}>
          <div style={{ marginBottom: '20px' }}>
            <img 
              alt={props.image.props.alt || ''} 
              src={props.image.props.url}
              style={imageStyle}
            />
          </div>
        </a>
      )}
      
      {props?.heading && (
        <a href={buttonUrl} style={linkStyle}>
          <h1 style={headingStyle}>
            {props.heading}
          </h1>
        </a>
      )}
      
      {props?.paragraph && (
        <p style={paragraphStyle}>
          {props.paragraph}
        </p>
      )}
      
      {props?.button && (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <a
            href={buttonUrl}
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: props.button.backgroundColor || '#007bff',
              color: props.button.textColor || '#ffffff',
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 500,
            }}
          >
            {props.button.text || 'Click Here'}
          </a>
        </div>
      )}
    </Container>
  );
}
