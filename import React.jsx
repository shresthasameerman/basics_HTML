import React, { useState, useEffect } from 'eact';
import marked from 'arked';

function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState(`
# Heading
## Subheading
[Link](https://www.example.com)
\`Inline code\`
\`\`\`
Code block
\`\`\`
* List item
> Blockquote
![Image](https://www.example.com/image.jpg)
**Bolded text**
  `);

  useEffect(() => {
    const previewHtml = marked(markdown);
    document.getElementById('preview').innerHTML = previewHtml;
  }, [markdown]);

  const handleMarkdownChange = (e) => {
    setMarkdown(e.target.value);
  };

  return (
    <div>
      <textarea id="editor" value={markdown} onChange={handleMarkdownChange} />
      <div id="preview" />
    </div>
  );
}

ReactDOM.render(<MarkdownPreviewer />, document.getElementById('root'));