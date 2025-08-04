import logo from "/images/chef-claude-icon.png"

export default function Header(){
    return (
        <header>
            <img src={logo} alt="logo"/>
            <span>Chef Claude</span>
        </header>
    )
}