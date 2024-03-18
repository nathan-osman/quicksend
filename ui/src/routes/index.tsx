import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { z } from 'zod'
import { apiPost } from '../lib/api'
import Textarea from '../components/form/Textarea'
import Controls from '../components/ui/Controls'
import Navbar from '../components/ui/Navbar'

export default function Index() {

  const [to, setTo] = useState<string[]>([])
  const [from, setFrom] = useState('')
  const [subject, setSubject] = useState('')
  const [text, setText] = useState('')
  const [html, setHtml] = useState('')

  const [debouncedHtml] = useDebounce(html, 1000)

  function handleSend() {
    apiPost(z.void(), '/api/send', {
      to,
      from,
      subject,
      text,
      html,
    })
      .then(() => {
        alert("Message sent!")
      })
      .catch(e => {
        alert(e)
      })
  }

  function handleHtmlChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setHtml(e.target.value)
  }

  return (
    <div className="grow flex flex-col gap-2 m-4">
      <Navbar />
      <Controls
        to={to}
        from={from}
        subject={subject}
        onToChange={setTo}
        onFromChange={setFrom}
        onSubjectChange={setSubject}
        onSend={handleSend}
      />
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
