import './userProfile.css'; // CSS geral
import { useParams, Link } from 'react-router-dom';
import avatarDefault from '../../assets/avatar.png';
import { FiEdit, FiArrowLeft } from 'react-icons/fi';
import { useState } from 'react';

export default function UserProfile({ isMyProfile }) {
    const { userId, profileName } = useParams(); // Pegando o ID e nome do usuário da URL

    const [isFollowing, setIsFollowing] = useState(false); // Simular o estado de seguir

    const handleFollowToggle = () => {
        setIsFollowing(!isFollowing);
    };

    return (
        <div className='container-user'>
               <Link to={'/'}> <FiArrowLeft size={24}/></Link>
            <div className='profile'>
                <img src={avatarDefault} alt='foto de perfil'/>
                <h1>{userId ? `Nome do usuário: ${userId}` : 'Nome do usuário'}</h1>
                <p>{profileName ? `Nome de usuário: ${profileName}` : 'Nome de usuário'}</p>

                <div className='stats'>
                    <div className='stat'>
                        <span><strong>0</strong> Seguindo</span>
                    </div>
                    <div className='stat'>
                        <span><strong>0</strong> Seguidores</span>
                    </div>
                    <div className='stat'>
                        <span><strong>0</strong> Artigos publicados</span>
                    </div>
                </div>

                {isMyProfile ? (
                    <div className='edit-profile'>
                        <Link to={'/editProfile'}>
                            <button>Editar perfil <FiEdit size={14}/></button>
                        </Link>
                    </div>
                ) : (
                    <div className='profile-actions'>
                        <button onClick={handleFollowToggle}>
                            {isFollowing ? 'Seguindo' : 'Seguir'}
                        </button>
                        <Link className='report' to={'/report'}>
                            Denunciar perfil
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
