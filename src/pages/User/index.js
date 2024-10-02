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

    const toggleFollow = (index) => {
        const updatedStatus = [...followingStatus];
        updatedStatus[index] = !updatedStatus[index];
        setFollowingStatus(updatedStatus);

        // Exibe toast de sucesso ao deixar de seguir
        if (!updatedStatus[index]) {
            toast.success("Deixou de seguir");
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
                            <Link><img src={user.avatar} alt="Avatar" className="avatar" /></Link>
                            <div className="user-info">
                                <Link to={'/Profile'}>
                                <strong>{user.name}</strong>
                                <p>@{user.profileName}</p>
                                </Link>
                            </div>
                            <button
                                className="follow-btn"
                                onClick={() => toggleFollow(index)}
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
    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);

    const followers = [
        { avatar: avatarDefault, name: "Usuário 1", profileName: "user1" },
        { avatar: avatarDefault, name: "Usuário 2", profileName: "user2" }
    ];

    const following = [
        { avatar: avatarDefault, name: "Usuário 3", profileName: "user3" },
        { avatar: avatarDefault, name: "Usuário 4", profileName: "user4" }
    ];

    // Filtrar seguidores que estão na lista de "Seguindo"
    const filteredFollowers = followers.filter(follower => 
        following.some(follow => follow.profileName === follower.profileName)
    );

    return (
        <div className='container-user'>
            <div className='profile'>
                <img src={avatarDefault} alt='foto de perfil'/>
                <h1>Nome do usuário</h1>
                <p>Nome de usuário</p>

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
                    users= {filteredFollowers} // Apenas os seguidores que você segue
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
