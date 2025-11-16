import { cn } from "@/lib/utils";

export function ProgressBar({ sections, currentSection }: { sections: Array<{ title: string, points: string[] }>, currentSection: number }) {
  return (
    <div className='absolute top-0 left-0 right-0 h-2 bg-background/80 backdrop-blur-xs pt-4 pb-2 border-b border-blue-50/10'>
      <div className="px-4 flex gap-1.5">
        {sections.map((_, index) => (
          <div key={index} className="h-1.5 flex-1 rounded-full overflow-hidden bg-blue-500/10">
            <div className={cn("h-full bg-linear-to-r from-gray-500 to-blue-500 duration-500", index === currentSection ? "w-full" : currentSection > index ? "w-full opacity-10" : "w-0")} />
          </div>
        ))}
      </div>
    </div>
  )
}
