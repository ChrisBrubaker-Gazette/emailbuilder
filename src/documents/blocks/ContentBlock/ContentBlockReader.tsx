import React from 'react';
import { ContentBlockProps } from './ContentBlockPropsSchema';

export default function ContentBlockReader({ style = {}, props = {} }: ContentBlockProps) {
  const containerStyle = {
    backgroundColor: style?.backgroundColor ?? '#ffffff',
    padding: style?.padding
      ? `${style.padding.top}px ${style.padding.right}px ${style.padding.bottom}px ${style.padding.left}px`
      : '24px',
  };

  const headingStyle = {
    margin: '0 0 16px 0',
    fontSize: '24px',
    fontWeight: 'bold',
    color: props.headingStyle?.color ?? '#333333',
    fontFamily: props.headingStyle?.fontFamily ?? 'Arial, sans-serif',
    textAlign: props.headingStyle?.textAlign ?? 'left',
  };

  const paragraphStyle = {
    margin: '0 0 20px 0',
    fontSize: '16px',
    lineHeight: '1.5',
    color: props.paragraphStyle?.color ?? '#666666',
    fontFamily: props.paragraphStyle?.fontFamily ?? 'Arial, sans-serif',
    textAlign: props.paragraphStyle?.textAlign ?? 'left',
  };

  const buttonStyle = {
    display: 'inline-block',
    padding: '12px 24px',
    backgroundColor: props.button?.backgroundColor ?? '#007bff',
    color: props.button?.textColor ?? '#ffffff',
    textDecoration: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 500,
  };

  return (
    <div style={containerStyle}>
      {props?.image?.props?.url && (
        <div style={{ marginBottom: '20px' }}>
          <img 
            alt={props.image.props.alt || ''} 
            src={props.image.props.url}
            style={{
              objectFit: 'contain',
              outline: 'none',
              border: 'none',
              textDecoration: 'none',
              verticalAlign: 'middle',
              display: 'inline-block',
              width: '100%'
            }}
          />
        </div>
      )}
      {props?.heading && (
        <h2 style={headingStyle}>
          {props.button?.href ? (
            <a href={props.button.href} style={{ color: 'inherit', textDecoration: 'none' }}>
              {props.heading}
            </a>
          ) : (
            props.heading
          )}
        </h2>
      )}
      {props?.paragraph && <p style={paragraphStyle}>{props.paragraph}</p>}
      {props?.button?.text && props?.button?.href && (
        <a href={props.button.href} style={buttonStyle}>
          {props.button.text}
        </a>
      )}
    </div>
  );
}
