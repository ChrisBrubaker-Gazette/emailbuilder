import React, { createContext, useContext, useMemo } from 'react';
import { renderToString } from 'react-dom/server';

import { useDocument } from '../../documents/editor/EditorContext';
import { EDITOR_DICTIONARY } from '../../documents/blocks';
import { buildBlockComponent } from '@usewaypoint/document-core';

import HighlightedCodePanel from './helper/HighlightedCodePanel';

const DocumentContext = createContext<any>({});

function BlockComponent({ id }: { id: string }) {
  const document = useContext(DocumentContext);
  const block = document[id];
  if (!block) {
    console.log('No block found for id:', id);
    return null;
  }

  const Component = EDITOR_DICTIONARY[block.type]?.Reader;
  if (!Component) {
    console.log('No reader component found for type:', block.type);
    return null;
  }

  // Render children if they exist
  const children = block.data?.childrenIds?.map((childId: string) => (
    <BlockComponent key={childId} id={childId} />
  ));

  return (
    <>
      <Component {...block.data} />
      {children}
    </>
  );
}

function Reader({ document, rootBlockId }: { document: any; rootBlockId: string }) {
  console.log('Reader rendering with document:', document, 'rootBlockId:', rootBlockId);
  return (
    <DocumentContext.Provider value={document}>
      <BlockComponent id={rootBlockId} />
    </DocumentContext.Provider>
  );
}

export default function HtmlPanel() {
  const document = useDocument();
  console.log('HtmlPanel document:', document);
  const code = useMemo(() => {
    try {
      const html = renderToString(
        <html>
          <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </head>
          <body style={{ margin: 0, padding: 0 }}>
            <Reader document={document} rootBlockId="root" />
          </body>
        </html>
      );
      return '<!DOCTYPE html>' + html;
    } catch (error) {
      console.error('Error rendering HTML:', error);
      return 'Error rendering HTML';
    }
  }, [document]);
  return <HighlightedCodePanel type="html" value={code} />;
}
