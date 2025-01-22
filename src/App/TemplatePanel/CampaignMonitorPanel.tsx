import React, { useMemo } from 'react';

import { useDocument } from '../../documents/editor/EditorContext';
import { mapDocumentToTemplate } from '../../utils/campaignMonitorMapper';

import HighlightedCodePanel from './helper/HighlightedCodePanel';

export default function CampaignMonitorPanel() {
  const document = useDocument();
  const code = useMemo(() => {
    const template = mapDocumentToTemplate(document);
    const campaignData = {
      "Name": "Testing AM update ",
      "Subject": `[eTool] subject line here`,
      "FromName": "The Denver Gazette",
      "FromEmail": "noreply@denvergazette.com",
      "ReplyTo": "noreply@denvergazette.com",
      "ListIDs": [
        "a0e3f28a3d58bad626ce258ffff094ad"
      ],
      "SegmentIDs": [],
      "TemplateID": "4d8c56563a5827de1736890cd166a8f4",
      "TemplateContent": template
    };
    return JSON.stringify(campaignData, null, '  ');
  }, [document]);
  
  return <HighlightedCodePanel type="json" value={code} />;
}
