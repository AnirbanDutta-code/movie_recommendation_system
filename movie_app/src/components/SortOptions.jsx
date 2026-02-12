const SORTS = [
  { key: 'rating', label: 'Rating (High → Low)' },
  { key: 'year', label: 'Release Year' },
  { key: 'az', label: 'Alphabetical (A–Z)' },
]

export default function SortOptions({ sortKey, onChange }) {
  return (
    <div className="pillGroup" role="tablist" aria-label="Sorting">
      {SORTS.map((s) => (
        <button
          key={s.key}
          className={sortKey === s.key ? 'pill pillActive' : 'pill'}
          onClick={() => onChange(s.key)}
          role="tab"
          aria-selected={sortKey === s.key}
        >
          {s.label}
        </button>
      ))}
    </div>
  )
}
