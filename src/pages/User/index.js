import './user.css';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import avatarDefault from '../../assets/avatar.png';
import { FiEdit } from 'react-icons/fi';
import { toast } from 'react-toastify';

const UserList = ({ title, users, followingList, onClose }) => {
    const modalRef = useRef(null);

    // Função que detecta cliques fora da modal
    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const [followingStatus, setFollowingStatus] = useState(
        users.map(user => followingList.some(follow => follow.profileName === user.profileName))
    );

    const toggleFollow = async (index, user) => {
        const updatedStatus = [...followingStatus];
        const isFollowing = updatedStatus[index];
        updatedStatus[index] = !isFollowing;
        setFollowingStatus(updatedStatus);

        try {
            if (isFollowing) {
                // Chamada para o backend para "deixar de seguir"
                await fetch(`/api/unfollow/${user.profileName}`, { method: 'POST' });
                toast.success("Deixou de seguir");
            } else {
                // Chamada para o backend para "seguir"
                await fetch(`/api/follow/${user.profileName}`, { method: 'POST' });
                toast.success("Seguiu com sucesso");
            }
        } catch (error) {
            console.error('Erro ao atualizar status de follow:', error);
            toast.error("Erro ao atualizar o status");
        }
    };

    return (
        <div className="user-list-overlay">
            <div className="user-list-modal" ref={modalRef}>
                <h3>{title}</h3>
                <button className="close-button" onClick={onClose}>
                    X
                </button>
                <ul>
                    {users.map((user, index) => (
                        <li key={index} className="user-item">
                            <Link><img src={user.avatar || avatarDefault} alt="Avatar" className="avatar" /></Link>
                            <div className="user-info">
                                <Link to={'/Profile'}>
                                    <strong>{user.name}</strong>
                                    <p>@{user.profileName}</p>
                                </Link>
                            </div>
                            <button
                                className="follow-btn"
                                onClick={() => toggleFollow(index, user)}
                            >
                                {followingStatus[index] ? "Seguindo" : "Seguir"}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default function User() {
    const [userData, setUserData] = useState({
        name: '',
        profileName: '',
        avatar: avatarDefault,
        email: '',
    });

    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    // Carregar dados do localStorage
    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    // Carregar lista de seguidores e seguidos do backend
    useEffect(() => {
        async function fetchUserLists() {
            try {
                const responseFollowers = await fetch('/api/followers'); // URL do endpoint de seguidores
                const followersData = await responseFollowers.json();

                const responseFollowing = await fetch('/api/following'); // URL do endpoint de seguidos
                const followingData = await responseFollowing.json();

                setFollowers(followersData); // Atualizar o estado de seguidores
                setFollowing(followingData); // Atualizar o estado de seguindo
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        }

        fetchUserLists();
    }, []);

    return (
        <div className='container-user'>
            <div className='profile'>
                <img src={userData.avatar || avatarDefault} alt='foto de perfil'/>
                <h1>{userData.name || "Nome do usuário"}</h1>
                <p>{userData.profileName || "Nome de usuário"}</p>

                <div className='stats'>
                    <div className='stat'>
                        <span onClick={() => setShowFollowing(true)}><strong>{following.length}</strong> Seguindo</span>
                    </div>
                    <div className='stat'>
                        <span onClick={() => setShowFollowers(true)}><strong>{followers.length}</strong> Seguidores</span>
                    </div>
                    <div className='stat'>
                        <span><strong>0</strong> Artigos publicados</span>
                    </div>
                </div>

                <div className='edit-profile'>
                    <Link to={'/editProfile'} ><button>Editar perfil <FiEdit size={14}/></button></Link>
                </div>
            </div>

            {showFollowers && (
                <UserList 
                    title="Seguidores" 
                    users={followers} 
                    followingList={following} 
                    onClose={() => setShowFollowers(false)} 
                />
            )}

            {showFollowing && (
                <UserList 
                    title="Seguindo" 
                    users={following} 
                    followingList={following} 
                    onClose={() => setShowFollowing(false)} 
                />
            )}
        </div>
    );
}
