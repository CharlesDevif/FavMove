import { useState } from 'react';
import './header.css'; // Assurez-vous que le chemin vers votre fichier CSS est correct
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    handleLogoutClick: () => void;
    handleMostRatedClick: () => void;
    handleUpcomingClick: () => void;
    handlePopularClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
    handleLogoutClick, 
    handleMostRatedClick, 
    handleUpcomingClick, 
    handlePopularClick 
}) => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <div id="header">
            <div id='titleApp'>
                <h2>FavMove</h2>
            </div>
            <div className="btnMenu">
            <button onClick={handleMostRatedClick}>Les mieux notés</button>
            <button onClick={handleUpcomingClick}>Prochainement</button>
            <button onClick={handlePopularClick}>Populaires</button>
                <button onClick={() => navigate('/lists')}>Mes listes</button>
            </div>
            <div className="burger-menu" onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={`menu-items ${isMenuOpen ? 'active' : ''}`}>
                <button className="btn" id="btnLogout" onClick={handleLogoutClick}>
                    Déconnexion
                </button>
            </div>
        </div>
    );
};

export default Header;
