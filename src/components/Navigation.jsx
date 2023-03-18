import { Link, BrowserRouter } from 'react-router-dom';

function Navigation(){
    return(
        <BrowserRouter>
        <nav className='nav'>
            <ul>
                <li>
                    <a href="#" target="_blank" rel="noopener noreferrer">Home</a>
                </li>
                <li>
                    <a href="#" target="_blank" rel="noopener noreferrer">Archive</a>
                </li>
                <li>
                    <a href="https://quickdraw.withgoogle.com/#" target="_blank" rel="noopener noreferrer">Need a Break?</a>
                </li>
            </ul>
        </nav>
        </BrowserRouter>
    )
}

export default Navigation;