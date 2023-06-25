import { ReactNode } from 'react';

type CommunicationButtonProps = {
  icon: ReactNode;
  text: string;
};

const CommunicationButton = ({ icon, text }: CommunicationButtonProps) => {
  return (
    <button className="btn btn-primary btn-outline py-1 h-full">
      <div className="flex flex-col items-center">
        {icon}
        <p className="lowercase font-light">{text}</p>
      </div>
    </button>
  );
};

export default CommunicationButton;
