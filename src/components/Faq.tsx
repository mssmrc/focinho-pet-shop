export function Faq({
  items,
  className = 'faq',
}: {
  items: readonly (readonly [string, string])[]
  className?: string
}) {
  return (
    <div className={className}>
      {items.map(([q, a], i) => (
        <details key={q} open={i === 0}>
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  )
}
