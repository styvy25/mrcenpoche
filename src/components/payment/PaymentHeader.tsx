
import React from 'react';

interface PaymentHeaderProps {
  title: string;
}

const PaymentHeader: React.FC<PaymentHeaderProps> = ({ title }) => {
  return (
    <h1 className="text-3xl font-bold mb-6">{title}</h1>
  );
};

export default PaymentHeader;
