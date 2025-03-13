
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePaymentStatus } from '@/hooks/payment/usePaymentStatus';
import PaymentHeader from '@/components/payment/PaymentHeader';
import PaymentStatus from '@/components/payment/PaymentStatus';
import PaymentSummary from '@/components/payment/PaymentSummary';
import PaymentLayout from '@/components/payment/PaymentLayout';
import PaymentContainer from '@/components/payment/PaymentContainer';
import PaymentCard from '@/components/payment/PaymentCard';

const PaymentPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session');
  const { paymentStatus, progress } = usePaymentStatus(sessionId);

  return (
    <PaymentLayout>
      <PaymentContainer
        mainContent={
          <PaymentCard
            headerContent={<PaymentHeader status={paymentStatus} progress={progress} />}
            mainContent={<PaymentStatus status={paymentStatus} progress={progress} />}
            showFooter={paymentStatus === 'error'}
          />
        }
        sideContent={<PaymentSummary />}
      />
    </PaymentLayout>
  );
};

export default PaymentPage;
