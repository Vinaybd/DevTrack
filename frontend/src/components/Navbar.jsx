import './Navbar.css'

function Navbar({ title, theme, onToggleTheme }) {
    return (
        <nav className="topbar">
            <h2>{title}</h2>

            <div className="nav-links">
                <a href="/">Dashboard</a>
                <a href="/">Tasks</a>
                <a href="/">Goals</a>
            </div>

            <button type="button" className="theme-toggle" onClick={onToggleTheme}>
                {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </button>
        </nav>
    )
}

export default Navbar