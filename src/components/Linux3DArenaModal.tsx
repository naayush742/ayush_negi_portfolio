import React, { useEffect } from 'react';

interface Linux3DArenaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Linux3DArenaModal: React.FC<Linux3DArenaModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    const handleMessage = (e: MessageEvent) => {
      if (e.data === 'close-linux-modal') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('message', handleMessage);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay active" style={{ zIndex: 11000, padding: 0, animation: 'fadeInOverlay 0.3s ease-out' }}>
      <div
        className="modal-container"
        style={{
          width: '100vw',
          height: '100vh',
          maxWidth: '100vw',
          maxHeight: '100vh',
          borderRadius: 0,
          background: '#020610',
          border: 'none',
          padding: 0,
          position: 'relative',
          animation: 'scaleUpModal 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
        }}
      >
        <style>{`
          @keyframes fadeInOverlay { from { opacity: 0; } to { opacity: 1; } }
          @keyframes scaleUpModal { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        `}</style>
        <iframe
          src="/linux.html"
          style={{ width: '100%', height: '100%', border: 'none' }}
          title="Linux Terminal Lab"
        />
      </div>
    </div>
  );
};

export default Linux3DArenaModal;
