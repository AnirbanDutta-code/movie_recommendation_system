export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="pillGroup" role="tablist" aria-label="Categories">
      <button
        className={active === 'All' ? 'pill pillActive' : 'pill'}
        onClick={() => onChange('All')}
        role="tab"
        aria-selected={active === 'All'}
      >
        All
      </button>
      {categories.map((c) => (
        <button
          key={c}
          className={active === c ? 'pill pillActive' : 'pill'}
          onClick={() => onChange(c)}
          role="tab"
          aria-selected={active === c}
        >
          {c}
        </button>
      ))}
    </div>
  )
}
