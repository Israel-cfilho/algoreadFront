import './profile.css';
import { FiSettings, FiUpload} from 'react-icons/fi';
import { useState } from 'react';
import avatarDefault from '../../assets/avatar.png'; // Avatar padrão
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function Profile({ updateUserData }) {
  const [formData, setFormData] = useState({
    name: '',
    profileName: '',
    birthDate: '',
  });

  const [avatar, setAvatar] = useState(avatarDefault);
  const [selectedFile, setSelectedFile] = useState(null);

  // Função para lidar com mudanças nos inputs do formulário
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Função para lidar com mudanças no avatar (upload de imagem)
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result); // Mostra a imagem no frontend
      };
      reader.readAsDataURL(file); // Lê o arquivo e exibe no preview
    }
  };

  // Função para enviar o formulário para o backend e atualizar o estado do perfil
  const handleSubmit = (e) => {
    e.preventDefault(); // Previne o comportamento padrão de reload

    // Cria um FormData para enviar os dados
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('username', formData.profileName);
    formDataToSend.append('date', formData.birthDate);

    if (selectedFile) {
      formDataToSend.append('avatar', selectedFile); // Envia o avatar se tiver
    }

    fetch('http://25.52.167.55:5001/UserCreate/1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        profileName: formData.profileName,
        birthDate: formData.birthDate,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Atualiza o estado do perfil após a atualização bem-sucedida
        updateUserData({
          name: formData.name,
          profileName: formData.profileName,
          avatar: avatar,
        });
        toast.success('Atualizado com sucesso!')
      })
      .catch((error) => toast.error('Erro ao atualizar perfil!'));
  };

  return (
    <div className='content'>
      <h2>
        <FiSettings size={18}/> Minha conta
      </h2>

      <Link to={'/'}><button className='back'>Voltar</button></Link>

      <div className='container'>
        <form className='form-profile' onSubmit={handleSubmit}>
          <label className='label-avatar'>
            <span>
              <FiUpload color='#fff' size={25} />
            </span>
            <input type='file' accept='image/*' onChange={handleAvatarChange} /> <br />
            <img src={avatar} alt='foto de perfil' width={250} height={250} />
          </label>

          <label>Nome</label>
          <input
            type='text'
            name='name'
            placeholder='Seu nome...'
            value={formData.name}
            onChange={handleChange}
          />

          <label>Nome de usuário</label>
          <input
            type='text'
            name='profileName'
            placeholder='Nome do Usuário...'
            value={formData.profileName}
            onChange={handleChange}
          />

          <label>Data de nascimento</label>
          <input
            type='date'
            name='birthDate'
            value={formData.birthDate}
            onChange={handleChange}
          />

          <button type='submit'>Salvar</button>
        </form>
      </div>
    </div>
  );
}
