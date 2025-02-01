import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function InputForm({ input, setInput, onSubmit, isLoading, placeholder, sampleInput }) {

  const handleUseSampleInput = () => {
    setInput(sampleInput)
  }
  return (
    <form onSubmit={onSubmit} className="space-y-4 text-black">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        className="w-full h-64 resize-none shadow-upper bg-white focus:outline-none outline-none"
      />
      <Button className='w-1/4 bg-white text-[#333333] font-semibold hover:border-[1px] hover:border-white hover:bg-[#333333] hover:text-white' type="submit" disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate'}
      </Button>
      <Button onClick={handleUseSampleInput} className='w-1/4 ml-4 bg-white text-[#333333] font-semibold hover:border-[1px] hover:border-white hover:bg-[#333333] hover:text-white' disabled={isLoading}>
        Use sample input
      </Button>
    </form>
  )
}