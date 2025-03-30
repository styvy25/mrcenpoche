
import React from 'react';
import DocumentsPage from '../components/documents/DocumentsPage';
import MainLayout from '@/components/layout/MainLayout';
import { useSearchParams } from 'react-router-dom';

const DocumentsPageRoute = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab');

  return (
    <MainLayout>
      <DocumentsPage initialTab={tab || undefined} />
    </MainLayout>
  );
};

export default DocumentsPageRoute;
