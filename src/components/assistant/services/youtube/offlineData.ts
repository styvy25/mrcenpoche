
import { YouTubeSearchResult, YouTubeVideoDetails } from './types';

// Mock search results for offline mode
const offlineSearchResults: Record<string, YouTubeSearchResult[]> = {
  'cameroon politics': [
    {
      id: 'offline-video-1',
      title: 'Overview of Cameroon Politics',
      description: 'A complete analysis of Cameroon\'s political landscape',
      thumbnail: 'https://via.placeholder.com/120x90',
      publishedAt: '2023-01-15',
      channelTitle: 'Africa Analysis'
    },
    {
      id: 'offline-video-2',
      title: 'Political Movements in Cameroon',
      description: 'Exploring the major political movements in Cameroon',
      thumbnail: 'https://via.placeholder.com/120x90',
      publishedAt: '2023-02-20',
      channelTitle: 'Political Insights'
    }
  ],
  'mrc cameroon': [
    {
      id: 'offline-video-3',
      title: 'MRC Movement in Cameroon',
      description: 'History and current status of the MRC movement',
      thumbnail: 'https://via.placeholder.com/120x90',
      publishedAt: '2023-03-10',
      channelTitle: 'Cameroon Today'
    }
  ],
  'default': [
    {
      id: 'offline-video-4',
      title: 'Politics of Central Africa',
      description: 'Overview of political situations in Central African countries',
      thumbnail: 'https://via.placeholder.com/120x90',
      publishedAt: '2023-01-05',
      channelTitle: 'Africa News Network'
    }
  ]
};

// Mock video details for offline mode
const offlineVideoDetails: Record<string, YouTubeVideoDetails> = {
  'offline-video-1': {
    id: 'offline-video-1',
    title: 'Overview of Cameroon Politics',
    description: 'This video provides a comprehensive analysis of Cameroon\'s political landscape, including historical context and current developments.',
    publishedAt: '2023-01-15T14:00:00Z',
    channelTitle: 'Africa Analysis',
    viewCount: '15420',
    likeCount: '1205',
    dislikeCount: '45',
    duration: 'PT15M30S',
    tags: ['Cameroon', 'politics', 'Africa', 'government']
  },
  'offline-video-2': {
    id: 'offline-video-2',
    title: 'Political Movements in Cameroon',
    description: 'Exploring the major political movements in Cameroon and their impact on national politics.',
    publishedAt: '2023-02-20T10:30:00Z',
    channelTitle: 'Political Insights',
    viewCount: '8750',
    likeCount: '950',
    dislikeCount: '30',
    duration: 'PT12M45S',
    tags: ['Cameroon', 'political movements', 'democracy', 'opposition']
  }
};

/**
 * Gets mock search results for offline mode
 */
export const getOfflineSearchResults = (query: string): YouTubeSearchResult[] => {
  const normalizedQuery = query.toLowerCase().trim();
  
  for (const key in offlineSearchResults) {
    if (normalizedQuery.includes(key)) {
      return offlineSearchResults[key];
    }
  }
  
  return offlineSearchResults.default;
};

/**
 * Gets mock video details for offline mode
 */
export const getOfflineVideoDetails = (videoId: string): YouTubeVideoDetails | null => {
  return offlineVideoDetails[videoId] || null;
};
