import UserReport from '../pages/UserReport'; // Importe o componente UserReport

function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/esqueceuSenha" element={<EsqueceuSenha />} />
            <Route path="/home" element={<Home />} />
            <Route path="/createUser" element={<CreateUser />} />
            <Route path="/user" element={<User />} />
            <Route path="/editProfile" element={<Profile />} />
            <Route path="/profile" element={<ProfileUser />} />
            <Route path="/report/:userId/:userName" element={<UserReport />} /> {/* Rota de denúncia */}
            <Route path="/reportPage" element={<ReportPage />} />
            <Route path="/banRequest" element={<BanRequest />} />
        </Routes>
    );
}

export default RoutesApp;
