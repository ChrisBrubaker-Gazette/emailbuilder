import React, { useState } from 'react';

import { RoundedCornerOutlined } from '@mui/icons-material';

import { EmailLayoutPropsSchema, EmailLayoutProps } from '../../../../documents/blocks/EmailLayout/EmailLayoutPropsSchema';

import BaseSidebarPanel from './helpers/BaseSidebarPanel';
import ColorInput, { NullableColorInput } from './helpers/inputs/ColorInput';
import { NullableFontFamily } from './helpers/inputs/FontFamily';
import SliderInput from './helpers/inputs/SliderInput';

type EmailLayoutSidebarFieldsProps = {
  data: EmailLayoutProps;
  setData: (v: EmailLayoutProps) => void;
};
export default function EmailLayoutSidebarFields({ data, setData }: EmailLayoutSidebarFieldsProps) {
  const [, setErrors] = useState<Zod.ZodError | null>(null);

  const updateData = (d: unknown) => {
    const res = EmailLayoutPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  const props = data.props || {};

  return (
    <BaseSidebarPanel title="Global">
      <ColorInput
        label="Backdrop color"
        defaultValue={props.backdropColor ?? '#F5F5F5'}
        onChange={(backdropColor) => updateData({ 
          ...data, 
          props: { ...props, backdropColor }
        })}
      />
      <ColorInput
        label="Canvas color"
        defaultValue={props.canvasColor ?? '#FFFFFF'}
        onChange={(canvasColor) => updateData({ 
          ...data, 
          props: { ...props, canvasColor }
        })}
      />
      <NullableColorInput
        label="Canvas border color"
        defaultValue={props.borderColor ?? null}
        onChange={(borderColor) => updateData({ 
          ...data, 
          props: { ...props, borderColor }
        })}
      />
      <SliderInput
        iconLabel={<RoundedCornerOutlined />}
        units="px"
        step={4}
        min={0}
        max={32}
        value={props.borderRadius ?? 0}
        onChange={(borderRadius) => updateData({ 
          ...data, 
          props: { ...props, borderRadius }
        })}
      />
      <NullableColorInput
        label="Text color"
        defaultValue={props.textColor ?? null}
        onChange={(textColor) => updateData({ 
          ...data, 
          props: { ...props, textColor }
        })}
      />
      <NullableFontFamily
        value={props.fontFamily ?? null}
        onChange={(fontFamily) => updateData({ 
          ...data, 
          props: { ...props, fontFamily }
        })}
      />
    </BaseSidebarPanel>
  );
}
