import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

export default function App() {
  const [text, setText] = useState('');
  const textAreaRef = useRef(null);

  useEffect(() => {
    socket.on('load-content', (data) => setText(data));
    socket.on('receive-changes', (data) => setText(data));
    return () => {
      socket.off('load-content');
      socket.off('receive-changes');
    };
  }, []);

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    socket.emit('send-changes', newText);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Real-Time Collaboration Tool</h1>
      <textarea
        ref={textAreaRef}
        value={text}
        onChange={handleChange}
        style={{ width: '100%', height: '80vh', fontSize: '16px', padding: '10px' }}
        placeholder=\"Start writing code or notes...\"
      />
    </div>
  );
}
