import { useParams } from 'react-router-dom';
import { useState } from 'react';
import './report.css';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function UserReport() {
    const { userId } = useParams(); // ID do usuário sendo denunciado
    const [reason, setReason] = useState('');
    const [reportingUserId, setReportingUserId] = useState(''); // Adicione aqui o ID do usuário que está reportando (pode vir de um contexto ou outra fonte)

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const reportData = {
            reportedUserId: userId, // ID do usuário que está sendo denunciado
            reportingUserId: reportingUserId, // ID do usuário que está denunciando
            reason: reason, // Razão da denúncia
        };
    
        try {
            const response = await fetch('http://25.52.167.55:5001/ReportUser/1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reportData), // Envia todos os dados necessários
            });
    
            if (response.ok) {
                toast.success('Denúncia enviada com sucesso!');
            } else {
                toast.error('Erro ao enviar denúncia!');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            toast.error('Erro ao enviar denúncia!');
        }
    };
    
    return (
        <div className="report-container">
            <Link className='back' to={'/'}><FiArrowLeft size={20}/></Link>
            <h1>Denunciar @{userId}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="reason">Razão da denúncia:</label>
                    <select id="reason" value={reason} onChange={(e) => setReason(e.target.value)} required>
                        <option value="">Selecione uma razão</option>
                        <option value="abuso">Abuso</option>
                        <option value="spam">Spam</option>
                        <option value="fraudes e golpes">Fraudes e golpes</option>
                        <option value="fingindo ser alguem">Fingindo ser alguém</option>
                        <option value="conteúdo impróprio">Conteúdo impróprio</option>
                        <option value="falsificações e propriedade intelectual">Falsificações e propriedade intelectual</option>
                        <option value="outros">Outros</option>
                    </select>
                </div>

                <button type="submit" className="submit-btn">Enviar denúncia</button>
            </form>
        </div>
    );
}
