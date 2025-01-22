import { z } from 'zod';
import { ImagePropsSchema } from '@usewaypoint/block-image';

const TextStyleSchema = z.object({
  textAlign: z.enum(['left', 'center', 'right', 'justify']).optional().nullable(),
  fontFamily: z.string().optional().nullable(),
  color: z.string().optional().nullable(),
});

const ContentBlockPropsSchema = z.object({
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
    image: ImagePropsSchema.optional().nullable(),
    heading: z.string().optional().nullable(),
    headingStyle: TextStyleSchema.optional().nullable(),
    paragraph: z.string().optional().nullable(),
    paragraphStyle: TextStyleSchema.optional().nullable(),
    button: z.object({
      text: z.string().optional().nullable(),
      href: z.string().optional().nullable(),
      backgroundColor: z.string().optional().nullable(),
      textColor: z.string().optional().nullable(),
    }).optional().nullable(),
  }).optional().nullable(),
});

export type ContentBlockProps = z.infer<typeof ContentBlockPropsSchema>;
export default ContentBlockPropsSchema;
