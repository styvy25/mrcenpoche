
import UserChat from "@/components/chat/UserChat";

const ModuleChatView = () => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-6 text-gradient-to-r from-mrc-blue to-mrc-green bg-clip-text text-transparent">
        Espace de discussion
      </h2>
      <UserChat />
    </div>
  );
};

export default ModuleChatView;
