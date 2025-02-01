import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ReactMarkdown from "react-markdown"

export default function Output({ completion, error, isLoading }) {
  return (
    <Card className='space-y-4 bg-white'>
      <CardHeader>
        <CardTitle>AI Output</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && <p>Generating...</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}
        {completion && <ReactMarkdown className="whitespace-pre-wrap">{completion}</ReactMarkdown>}
      </CardContent>
    </Card>
  )
}
