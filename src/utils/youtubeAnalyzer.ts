
// This file is now a re-export of the modularized version
// for backwards compatibility
import { useYoutubeAnalyzer as useYoutubeAnalyzerInternal } from './youtube';
export { useYoutubeAnalyzer };

function useYoutubeAnalyzer() {
  return useYoutubeAnalyzerInternal();
}
