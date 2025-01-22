import React, { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';

import ContentBlockPropsSchema, { ContentBlockProps } from '../../../../documents/blocks/ContentBlock/ContentBlockPropsSchema';

import BaseSidebarPanel from './helpers/BaseSidebarPanel';
import ColorInput from './helpers/inputs/ColorInput';
import TextInput from './helpers/inputs/TextInput';

const fontFamilyOptions = ['Arial, sans-serif', 'Times New Roman, serif', 'Courier New, monospace'];
const alignmentOptions = ['left', 'center', 'right', 'justify'];

type ContentBlockSidebarPanelProps = {
  data: ContentBlockProps;
  setData: (v: ContentBlockProps) => void;
};

export default function ContentBlockSidebarPanel({ data, setData }: ContentBlockSidebarPanelProps) {
  const [, setErrors] = useState<Zod.ZodError | null>(null);

  const updateData = (d: unknown) => {
    const res = ContentBlockPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  return (
    <BaseSidebarPanel>
      <Stack spacing={3}>
        {/* Block Style Section */}
        <Stack spacing={2}>
          <Typography variant="subtitle2">Block Style</Typography>
          <ColorInput
            label="Background Color"
            defaultValue={data.style?.backgroundColor ?? '#ffffff'}
            onChange={(backgroundColor) => updateData({
              ...data,
              style: { ...data.style, backgroundColor }
            })}
          />
        </Stack>

        {/* Content Section */}
        <Stack spacing={2}>
          {/* Image Settings */}
          <Typography variant="subtitle2">Image</Typography>
          <TextInput
            label="Image URL"
            defaultValue={data.props?.image?.props?.url ?? ''}
            onChange={(url) => updateData({
              ...data,
              props: {
                ...data.props,
                image: { props: { ...data.props?.image?.props, url } }
              }
            })}
          />
          <TextInput
            label="Alt Text"
            defaultValue={data.props?.image?.props?.alt ?? ''}
            onChange={(alt) => updateData({
              ...data,
              props: {
                ...data.props,
                image: { props: { ...data.props?.image?.props, alt } }
              }
            })}
          />

          {/* Heading Settings */}
          <Typography variant="subtitle2">Heading</Typography>
          <TextInput
            label="Heading Text"
            defaultValue={data.props?.heading ?? ''}
            onChange={(heading) => updateData({
              ...data,
              props: { ...data.props, heading }
            })}
          />
          <ColorInput
            label="Text Color"
            defaultValue={data.props?.headingStyle?.color ?? '#000000'}
            onChange={(color) => updateData({
              ...data,
              props: {
                ...data.props,
                headingStyle: { ...data.props?.headingStyle, color }
              }
            })}
          />
          <FormControl fullWidth>
            <InputLabel>Text Alignment</InputLabel>
            <Select
              value={data.props?.headingStyle?.textAlign ?? 'left'}
              label="Text Alignment"
              onChange={(e) => updateData({
                ...data,
                props: {
                  ...data.props,
                  headingStyle: { ...data.props?.headingStyle, textAlign: e.target.value }
                }
              })}
            >
              {alignmentOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small">
            <InputLabel>Font Family</InputLabel>
            <Select
              value={data.props?.headingStyle?.fontFamily ?? 'Arial, sans-serif'}
              label="Font Family"
              onChange={(e) => updateData({
                ...data,
                props: {
                  ...data.props,
                  headingStyle: { ...data.props?.headingStyle, fontFamily: e.target.value }
                }
              })}
              displayEmpty
            >
              <MenuItem value="">Default Font</MenuItem>
              {fontFamilyOptions.map((font) => (
                <MenuItem key={font} value={font}>
                  {font}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Paragraph Settings */}
          <Typography variant="subtitle2">Paragraph</Typography>
          <TextInput
            label="Paragraph Text"
            multiline
            rows={4}
            defaultValue={data.props?.paragraph ?? ''}
            onChange={(paragraph) => updateData({
              ...data,
              props: { ...data.props, paragraph }
            })}
          />
          <ColorInput
            label="Text Color"
            defaultValue={data.props?.paragraphStyle?.color ?? '#000000'}
            onChange={(color) => updateData({
              ...data,
              props: {
                ...data.props,
                paragraphStyle: { ...data.props?.paragraphStyle, color }
              }
            })}
          />
          <FormControl fullWidth>
            <InputLabel>Text Alignment</InputLabel>
            <Select
              value={data.props?.paragraphStyle?.textAlign ?? 'left'}
              label="Text Alignment"
              onChange={(e) => updateData({
                ...data,
                props: {
                  ...data.props,
                  paragraphStyle: { ...data.props?.paragraphStyle, textAlign: e.target.value }
                }
              })}
            >
              {alignmentOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small">
            <InputLabel>Font Family</InputLabel>
            <Select
              value={data.props?.paragraphStyle?.fontFamily ?? 'Arial, sans-serif'}
              label="Font Family"
              onChange={(e) => updateData({
                ...data,
                props: {
                  ...data.props,
                  paragraphStyle: { ...data.props?.paragraphStyle, fontFamily: e.target.value }
                }
              })}
              displayEmpty
            >
              <MenuItem value="">Default Font</MenuItem>
              {fontFamilyOptions.map((font) => (
                <MenuItem key={font} value={font}>
                  {font}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Button Settings */}
          <Typography variant="subtitle2">Button</Typography>
          <TextInput
            label="Button Text"
            defaultValue={data.props?.button?.text ?? ''}
            onChange={(text) => updateData({
              ...data,
              props: {
                ...data.props,
                button: { ...data.props?.button, text }
              }
            })}
          />
          <TextInput
            label="Button Link"
            defaultValue={data.props?.button?.href ?? ''}
            onChange={(href) => updateData({
              ...data,
              props: {
                ...data.props,
                button: { ...data.props?.button, href }
              }
            })}
          />
          <ColorInput
            label="Background Color"
            defaultValue={data.props?.button?.backgroundColor ?? '#007bff'}
            onChange={(backgroundColor) => updateData({
              ...data,
              props: {
                ...data.props,
                button: { ...data.props?.button, backgroundColor }
              }
            })}
          />
          <ColorInput
            label="Text Color"
            defaultValue={data.props?.button?.textColor ?? '#ffffff'}
            onChange={(textColor) => updateData({
              ...data,
              props: {
                ...data.props,
                button: { ...data.props?.button, textColor }
              }
            })}
          />
        </Stack>
      </Stack>
    </BaseSidebarPanel>
  );
}
