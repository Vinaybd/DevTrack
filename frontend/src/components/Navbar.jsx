import './Navbar.css'

function Navbar({title}){
    return (
        <nav>
            <h2>{title}</h2>

            <div>
                <a href="/">Dashboard</a>
                <a href="/">Tasks</a>
                <a href="/">Goals</a>
            </div>
        </nav>
    )
}

export default Navbar