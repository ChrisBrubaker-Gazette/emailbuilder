import React from 'react';

import { Box, Typography } from '@mui/material';

import { TEditorBlock } from '../../../documents/editor/core';
import { setDocument, useDocument, useSelectedBlockId } from '../../../documents/editor/EditorContext';

import ContentBlockContent from './ContentBlockContent';

function renderMessage(val: string) {
  return (
    <Box sx={{ m: 3, p: 1, border: '1px dashed', borderColor: 'divider' }}>
      <Typography color="text.secondary">{val}</Typography>
    </Box>
  );
}

export default function Content() {
  const document = useDocument();
  const selectedBlockId = useSelectedBlockId();
  const setBlock = React.useCallback((conf: TEditorBlock) => {
    if (!selectedBlockId) return;
    setDocument({ [selectedBlockId]: conf });
  }, [selectedBlockId]);

  if (!selectedBlockId) {
    return renderMessage('Click on a block to edit content.');
  }
  const block = document[selectedBlockId];
  if (!block) {
    return renderMessage(`Block with id ${selectedBlockId} was not found. Click on a block to reset.`);
  }

  const { data, type } = block;
  switch (type) {
    case 'ContentBlock':
      return <ContentBlockContent key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    default:
      return renderMessage('This block type does not have editable content.');
  }
}
