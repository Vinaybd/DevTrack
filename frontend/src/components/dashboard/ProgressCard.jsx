function ProgressCard({ title, completed, label }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{completed} {label}</p>
    </div>
  )
}

export default ProgressCard