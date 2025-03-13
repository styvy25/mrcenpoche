
import React from 'react';

interface PaymentContainerProps {
  mainContent: React.ReactNode;
  sideContent: React.ReactNode;
}

const PaymentContainer: React.FC<PaymentContainerProps> = ({ 
  mainContent, 
  sideContent 
}) => {
  return (
    <div className="grid md:grid-cols-4 gap-6">
      {/* Main column */}
      <div className="md:col-span-3">
        {mainContent}
      </div>
      
      {/* Side column */}
      <div className="md:col-span-1">
        {sideContent}
      </div>
    </div>
  );
};

export default PaymentContainer;
