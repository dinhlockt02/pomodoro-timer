import logo from '../assets/images/logo.png'

function Header() {
    return (
        <header className="flex items-center justify-center w-full my-4">
            <div className="flex items-center gap-4">
                <p className="font-lobster text-2xl text-primary">Pomodoro</p>
                <img src={logo} alt="logo" className="w-8"/>
            </div>
        </header>
    );
}

export default Header;