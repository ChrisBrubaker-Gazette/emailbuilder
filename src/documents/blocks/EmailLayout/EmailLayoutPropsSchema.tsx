import { z } from 'zod';

const COLOR_SCHEMA = z
  .string()
  .regex(/^#[0-9a-fA-F]{6}$/)
  .nullable()
  .optional();

const FONT_FAMILY_SCHEMA = z
  .enum([
    'MODERN_SANS',
    'BOOK_SANS',
    'ORGANIC_SANS',
    'GEOMETRIC_SANS',
    'HEAVY_SANS',
    'ROUNDED_SANS',
    'MODERN_SERIF',
    'BOOK_SERIF',
    'MONOSPACE',
  ])
  .nullable()
  .optional();

export const EmailLayoutPropsSchema = z.object({
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
    backdropColor: COLOR_SCHEMA,
    borderColor: COLOR_SCHEMA,
    borderRadius: z.number().optional().nullable(),
    canvasColor: COLOR_SCHEMA,
    textColor: COLOR_SCHEMA,
    fontFamily: FONT_FAMILY_SCHEMA,
    childrenIds: z.array(z.string()).optional().nullable(),
  }).optional().nullable(),
});

export type EmailLayoutProps = z.infer<typeof EmailLayoutPropsSchema>;
