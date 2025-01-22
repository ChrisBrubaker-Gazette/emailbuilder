import { buildBlockConfigurationDictionary } from '@usewaypoint/document-core';

import ContentBlockPropsSchema from './ContentBlock/ContentBlockPropsSchema';
import ContentBlockReader from './ContentBlock/ContentBlockReader';
import ContentBlockEditor from './ContentBlock/ContentBlockEditor';

import { TextEditorBlockPropsSchema } from './TextEditorBlock/TextEditorBlockPropsSchema';
import TextEditorBlockReader from './TextEditorBlock/TextEditorBlockReader';
import TextEditorBlockEditor from './TextEditorBlock/TextEditorBlockEditor';

import { EmailLayoutPropsSchema } from './EmailLayout/EmailLayoutPropsSchema';
import EmailLayoutReader from './EmailLayout/EmailLayoutReader';
import EmailLayoutEditor from './EmailLayout/EmailLayoutEditor';

import { Image } from '@usewaypoint/block-image';
import { Text } from '@usewaypoint/block-text';
import { Button } from '@usewaypoint/block-button';

export const EDITOR_DICTIONARY = buildBlockConfigurationDictionary({
  ContentBlock: {
    schema: ContentBlockPropsSchema,
    Component: ContentBlockEditor,
    Reader: ContentBlockReader,
  },
  TextEditorBlock: {
    schema: TextEditorBlockPropsSchema,
    Component: TextEditorBlockEditor,
    Reader: TextEditorBlockReader,
  },
  EmailLayout: {
    schema: EmailLayoutPropsSchema,
    Component: EmailLayoutEditor,
    Reader: EmailLayoutReader,
  },
  Image: {
    schema: Image.schema,
    Component: Image.Component,
    Reader: Image.Reader,
  },
  Text: {
    schema: Text.schema,
    Component: Text.Component,
    Reader: Text.Reader,
  },
  Button: {
    schema: Button.schema,
    Component: Button.Component,
    Reader: Button.Reader,
  },
});
