import { TEditorBlock } from '../documents/editor/core';

type CampaignMonitorSingleline = {
  Content: string;
  Href?: string;
};

type CampaignMonitorMultiline = {
  Content: string;
};

type CampaignMonitorImage = {
  Content: string;
  Alt: string;
  Href?: string;
};

type CampaignMonitorRepeaterItem = {
  Singlelines?: CampaignMonitorSingleline[];
  Multilines?: CampaignMonitorMultiline[];
  Images?: CampaignMonitorImage[];
};

type CampaignMonitorRepeater = {
  Items: CampaignMonitorRepeaterItem[];
};

type CampaignMonitorTemplate = {
  Repeaters: CampaignMonitorRepeater[];
};

const blockTypeToTemplateMap: Record<string, (block: TEditorBlock) => CampaignMonitorTemplate> = {
  ContentBlock: (block: TEditorBlock): CampaignMonitorTemplate => {
    const props = block.data?.props || {};
    const item: CampaignMonitorRepeaterItem = {};

    // Map heading to Singleline
    if (props.heading) {
      item.Singlelines = [{
        Content: props.heading,
        Href: props.button?.href
      }];
    }

    // Map paragraph to Multiline
    if (props.paragraph) {
      item.Multilines = [{
        Content: props.paragraph
      }];
    }

    // Map image to Images
    if (props.image) {
      item.Images = [{
        Content: props.image.props.url,
        Alt: props.image.props.alt || props.heading || '',
        Href: props.button?.href
      }];
    }

    return {
      Repeaters: [{
        Items: [item]
      }]
    };
  },

  // Add mappings for other block types here
  TextEditorBlock: (block: TEditorBlock): CampaignMonitorTemplate => {
    return {
      Repeaters: [{
        Items: [{
          Multilines: [{
            Content: block.data?.props?.content || ''
          }]
        }]
      }]
    };
  }
};

export const mapBlockToTemplate = (block: TEditorBlock): CampaignMonitorTemplate => {
  const mapper = blockTypeToTemplateMap[block.type];
  if (!mapper) {
    console.warn(`No template mapper found for block type: ${block.type}`);
    return { Repeaters: [] };
  }
  return mapper(block);
};

export const mapDocumentToTemplate = (document: Record<string, TEditorBlock>): CampaignMonitorTemplate => {
  const rootBlock = document['root'];
  if (!rootBlock) {
    console.warn('No root block found in document');
    return { Repeaters: [] };
  }

  // Get all child blocks in order
  const childrenIds = rootBlock.data?.childrenIds || [];
  const templates = childrenIds.map(id => {
    const block = document[id];
    if (!block) {
      console.warn(`Block with id ${id} not found`);
      return null;
    }
    return mapBlockToTemplate(block);
  }).filter(Boolean);

  // Combine all templates into one
  return {
    Repeaters: templates.flatMap(template => template?.Repeaters || [])
  };
};
