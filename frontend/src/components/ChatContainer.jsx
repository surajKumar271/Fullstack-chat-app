import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
  const {
    messages = [],
    getMessages,
    isMessagesLoading,
    selectedUser,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const endRef = useRef(null);

  useEffect(() => {
    if (!selectedUser) return;
    getMessages(selectedUser._id);
  }, [selectedUser]);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-base-content/60">
        Select a user to start chatting
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-base-100">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isMessagesLoading ? (
          <div className="text-center text-sm text-base-content/60">
            Loading...
          </div>
        ) : (
          messages.map((m) => {
            const isMe = m.senderId === authUser._id;

            return (
              <div
                key={m._id}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg shadow-sm ${
                    isMe
                      ? "bg-primary text-primary-content"
                      : "bg-base-200"
                  }`}
                >
                  {m.image && (
                    <img
                      src={m.image}
                      alt="message"
                      className="max-w-[200px] rounded-lg mb-2"
                    />
                  )}

                  {m.text && <p className="text-sm">{m.text}</p>}

                  <p className="text-xs mt-1 text-base-content/70">
                    {new Date(m.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            );
          })
        )}

        <div ref={endRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
