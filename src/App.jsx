import { useEffect, useState } from 'react';
import './styles.css';

function App() {
  const [html, setHtml] = useState('');

  useEffect(() => {
    fetch('/content.html')
      .then((res) => res.text())
      .then((data) => {
         const parser = new DOMParser();
         const doc = parser.parseFromString(data, 'text/html');
         setHtml(doc.body.innerHTML);
         
         // Update page title
         document.title = "ShapeHause";
      });
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export default App;
