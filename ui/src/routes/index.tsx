import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { useApi } from '../lib/api'
import Textarea from '../components/form/Textarea'
import Controls from '../components/ui/Controls'
import Navbar from '../components/ui/Navbar'

export default function Index() {

  const api = useApi()

  const [text, setText] = useState('')
  const [html, setHtml] = useState('')

  const [debouncedHtml] = useDebounce(html, 1000)

  function handleHtmlChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setHtml(e.target.value)
  }

  return (
    <div className="grow flex flex-col gap-2 m-4">
      <Navbar />
      <Controls />
      <div className="grow flex flex-col lg:flex-row gap-2">
        <div className="lg:flex-1 bg-background rounded p-2">
          <Textarea
            className="h-full resize-none font-mono"
            spellCheck={false}
            placeholder="Text content"
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </div>
        <div className="lg:flex-1 bg-background rounded p-2">
          <Textarea
            className="h-full resize-none font-mono"
            spellCheck={false}
            placeholder="HTML content (with preview)"
            value={html}
            onChange={handleHtmlChange}
          />
        </div>
        <div className="lg:flex-1 bg-background rounded p-2">
          <iframe
            className="bg-white rounded w-full h-full"
            srcDoc={debouncedHtml}
          />
        </div>
      </div>
    </div>
  )
}
