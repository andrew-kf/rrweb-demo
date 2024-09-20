import { useEffect, useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import chunkedEvents from './events-chunked';
import rrweb from 'rrweb';
import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';

function App() {
  const events = useMemo(() => {
    return chunkedEvents
      .filter(chunk => chunk.rrwebEvents.length)
      .sort((a, b) => a.rrwebEvents[0].timestamp - b.rrwebEvents[0].timestamp)
      .reduce((arr, chunk) => [...arr, ...chunk.rrwebEvents], [])
  }, []);

  useEffect(() => {
    console.log('events', events);
    new rrwebPlayer({
      target: document.getElementById('hello'), // customizable root element
      props: {
        events,
        UNSAFE_replayCanvas: true,
      },
    });
  }, []);
  return (
    <div id="hello">
    </div>
  );
}

export default App;
