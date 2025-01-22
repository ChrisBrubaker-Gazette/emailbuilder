import { z } from 'zod';

export const TextEditorBlockPropsSchema = z.object({
  style: z.object({
    backgroundColor: z.string().optional().nullable(),
    padding: z.object({
      top: z.number(),
      bottom: z.number(),
      right: z.number(),
      left: z.number(),
    }).optional().nullable(),
  }).optional().nullable(),
  props: z.object({
    content: z.string(),
    textStyle: z.object({
      fontFamily: z.string().optional().nullable(),
      color: z.string().optional().nullable(),
    }).optional().nullable(),
  }),
});

export type TextEditorBlockProps = z.infer<typeof TextEditorBlockPropsSchema>;
