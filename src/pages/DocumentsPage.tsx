
import React from 'react';
import DocumentsPage from '../components/documents/DocumentsPage';
import MainLayout from '@/components/layout/MainLayout';
import { useSearchParams } from 'react-router-dom';
import { useScreenSize } from '@/hooks/useScreenSize';

const DocumentsPageRoute = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab');
  const { isMobile } = useScreenSize();

  return (
    <MainLayout>
      <div className={isMobile ? 'px-0' : ''}>
        <DocumentsPage initialTab={tab || undefined} />
      </div>
    </MainLayout>
  );
};

export default DocumentsPageRoute;
