import React, { useState } from 'react';
import { Button, CircularProgress, Stack, Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, IconButton } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

type RssItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  creator: string;
  thumbnail?: string;
};

type ContentBlockContentProps = {
  data: any;
  setData: (data: any) => void;
};

interface RssSource {
  name: string;
  url: string;
}

const RSS_SOURCES: RssSource[] = [
  { name: 'Denver Gazette - Latest News', url: 'https://denvergazette.com/search/?f=rss&t=article&c=news&l=50&s=start_time&sd=desc' },
  { name: 'Denver Gazette - Public Safety', url: 'https://denvergazette.com/search/?f=rss&t=article&c=news/public-safety&l=50&s=start_time&sd=desc' },
  { name: 'Denver Gazette - Politics', url: 'https://denvergazette.com/search/?f=rss&t=article&c=news/politics&l=50&s=start_time&sd=desc' },
];

export default function ContentBlockContent({ data, setData }: ContentBlockContentProps) {
  const [url, setUrl] = useState('');
  const [selectedRssSource, setSelectedRssSource] = useState('');
  const [loadingMeta, setLoadingMeta] = useState(false);
  const [loadingRss, setLoadingRss] = useState(false);
  const [rssItems, setRssItems] = useState<RssItem[]>([]);
  const [metaData, setMetaData] = useState<{ title?: string; image?: string; description?: string }>({});
  const [creatingCampaign, setCreatingCampaign] = useState(false);

  const fetchMetaTags = async () => {
    if (!url) return;
    setLoadingMeta(true);
    try {
      const encodedUrl = encodeURIComponent(url);
      console.log('Fetching meta tags for URL:', encodedUrl);
      const response = await fetch(`https://0ogmsfsk20.execute-api.us-east-1.amazonaws.com?url=${encodedUrl}`);
      const html = await response.text();
      
      // Create a DOM parser
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Get meta tags
      const ogImage = doc.querySelector('meta[property="og:image"]')?.getAttribute('content');
      const ogTitle = doc.querySelector('meta[property="og:title"]')?.getAttribute('content');
      const ogDescription = doc.querySelector('meta[property="og:description"]')?.getAttribute('content');
      
      console.log('Meta tags found:', { ogImage, ogTitle, ogDescription });
      
      const newMetaData = {
        title: ogTitle || '',
        image: ogImage || '',
        description: ogDescription || ''
      };
      
      setMetaData(newMetaData);
      setData({
        ...data,
        props: {
          ...data.props,
          metaData: newMetaData
        }
      });
    } catch (error) {
      console.error('Error fetching meta tags:', error);
    } finally {
      setLoadingMeta(false);
    }
  };

  const fetchRssFeed = async () => {
    if (!url) return;
    setLoadingRss(true);
    try {
      const encodedUrl = encodeURIComponent(url);
      const response = await fetch(`https://0ogmsfsk20.execute-api.us-east-1.amazonaws.com?url=${encodedUrl}`);
      const text = await response.text();
      
      // Parse XML
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "text/xml");
      
      // Get all items
      const items = xmlDoc.getElementsByTagName('item');
      const parsedItems: RssItem[] = [];
      
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const title = item.getElementsByTagName('title')[0]?.textContent || '';
        const description = item.getElementsByTagName('description')[0]?.textContent || '';
        const link = item.getElementsByTagName('link')[0]?.textContent || '';
        const pubDate = item.getElementsByTagName('pubDate')[0]?.textContent || '';
        const creator = item.getElementsByTagName('dc:creator')[0]?.textContent || '';
        const enclosure = item.getElementsByTagName('enclosure')[0];
        const thumbnail = enclosure?.getAttribute('url') || '';
        
        parsedItems.push({
          title,
          description,
          link,
          pubDate,
          creator,
          thumbnail
        });
      }
      
      setRssItems(parsedItems);
    } catch (error) {
      console.error('Error fetching RSS feed:', error);
    } finally {
      setLoadingRss(false);
    }
  };

  const addMetaDataToContent = () => {
    setData({
      ...data,
      props: {
        ...data.props,
        heading: metaData.title || '',
        paragraph: metaData.description || '',
        image: metaData.image ? {
          props: {
            url: metaData.image,
            alt: metaData.title || '',
            width: '600',
            height: '400',
            style: 'outline: none; border: medium; text-decoration: none; vertical-align: middle; display: inline-block; max-width: 100%; width: 600px; height: 400px;'
          }
        } : null,
        button: {
          text: 'Read More',
          href: url,
          backgroundColor: '#1976d2',
          textColor: '#ffffff'
        }
      }
    });
  };

  const addRssItemToContent = (item: RssItem) => {
    setData({
      ...data,
      props: {
        ...data.props,
        heading: item.title || '',
        paragraph: item.description || '',
        image: item.thumbnail ? {
          props: {
            url: item.thumbnail,
            alt: item.title || '',
            width: 600,
            height: 400,
            style: 'outline: none; border: medium; text-decoration: none; vertical-align: middle; display: inline-block; max-width: 100%; width: 600px; height: 400px; object-fit: contain;'
          }
        } : null,
        button: {
          text: 'Read More',
          href: item.link,
          backgroundColor: '#1976d2',
          textColor: '#ffffff'
        }
      }
    });
  };

  const handleRssSourceChange = (event: any) => {
    const selectedUrl = event.target.value;
    setSelectedRssSource(selectedUrl);
    if (selectedUrl) {
      setUrl(selectedUrl);
      fetchRssFeed();
    }
  };

  const createCampaign = async () => {
    if (!data?.props?.heading) return;
    setCreatingCampaign(true);
    try {
      const response = await fetch('https://api.createsend.com/api/v3.3/campaigns/209dc9af45416fe8d4d8a5df36b46625/fromtemplate.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('your-api-key:x'), // Replace with actual API key
        },
        body: JSON.stringify({
          "Name": data.props.heading,
          "Subject": `[Blox] ${data.props.heading}`,
          "FromName": "The Denver Gazette",
          "FromEmail": "noreply@denvergazette.com",
          "ReplyTo": "noreply@denvergazette.com",
          "ListIDs": [
            "a0e3f28a3d58bad626ce258ffff094ad"
          ],
          "SegmentIDs": [],
          "TemplateID": "4d8c56563a5827de1736890cd166a8f4",
          "TemplateContent": {
            "Repeaters": [
              {
                "Items": [
                  {
                    "Singlelines": [
                      {
                        "Content": data.props.heading,
                        "Href": data.props.button?.href || "#"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Campaign created:', result);
    } catch (error) {
      console.error('Error creating campaign:', error);
    } finally {
      setCreatingCampaign(false);
    }
  };

  return (
    <Stack spacing={3} sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Box>
          <TextField
            fullWidth
            label="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            sx={{ mb: 1 }}
          />
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              onClick={fetchMetaTags}
              disabled={!url || loadingMeta}
              startIcon={loadingMeta ? <CircularProgress size={20} /> : null}
            >
              Fetch Meta Tags
            </Button>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>RSS Feed</InputLabel>
              <Select
                value={selectedRssSource}
                onChange={handleRssSourceChange}
                label="RSS Feed"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {RSS_SOURCES.map((source) => (
                  <MenuItem key={source.url} value={source.url}>
                    {source.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Box>
        {metaData.image && (
          <Box sx={{ mt: 2 }}>
            <Box
              component="img"
              src={metaData.image}
              alt={metaData.title}
              sx={{
                width: '100%',
                height: 200,
                objectFit: 'cover',
                borderRadius: 1,
                mb: 1
              }}
            />
            <Box sx={{ 
              fontSize: '16px',
              fontWeight: 600,
              color: '#333',
              mb: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              {metaData.title}
              <IconButton
                onClick={createCampaign}
                disabled={creatingCampaign}
                color="primary"
                size="small"
              >
                {creatingCampaign ? <CircularProgress size={20} /> : <EmailIcon />}
              </IconButton>
            </Box>
            {metaData.description && (
              <Box sx={{ 
                fontSize: '14px',
                color: '#666',
                mb: 2,
                lineHeight: 1.5
              }}>
                {metaData.description}
              </Box>
            )}
            <Button
              variant="contained"
              onClick={addMetaDataToContent}
              fullWidth
              color="success"
            >
              Add to Content
            </Button>
          </Box>
        )}
      </Stack>

      <Button
        variant="contained"
        onClick={fetchRssFeed}
        disabled={loadingRss}
        startIcon={loadingRss ? <CircularProgress size={20} /> : null}
        fullWidth
      >
        {loadingRss ? 'Loading Feed...' : 'Load RSS Feed'}
      </Button>

      {rssItems.length > 0 && (
        <Box sx={{ 
          mt: 2,
          maxHeight: 'calc(100vh - 300px)',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '4px',
          },
        }}>
          {rssItems.map((item, index) => (
            <Box key={index} sx={{ 
              mb: 2, 
              p: 2, 
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1
            }}>
              <Stack spacing={2}>
                {item.thumbnail && (
                  <Box sx={{ 
                    width: '100%',
                    height: 200,
                    overflow: 'hidden',
                    borderRadius: 1
                  }}>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </Box>
                )}
                <Stack spacing={1}>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.creator} • {new Date(item.pubDate).toLocaleDateString()}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      onClick={() => addRssItemToContent(item)}
                      size="small"
                    >
                      Add Content
                    </Button>
                    <IconButton
                      onClick={createCampaign}
                      disabled={creatingCampaign}
                      color="primary"
                      size="small"
                    >
                      {creatingCampaign ? <CircularProgress size={20} /> : <EmailIcon />}
                    </IconButton>
                  </Box>
                </Stack>
              </Stack>
            </Box>
          ))}
        </Box>
      )}
    </Stack>
  );
}
