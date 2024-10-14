import { useParams } from 'react-router-dom';
import { useState } from 'react';
import './report.css';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';

const token = "eyJhbGciOiJIUzI1NiIsImtpZCI6IkV2RWRGUm5Da1NJM25yakEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2VhYnJ1YWV2Y2twdmVwcXFxbWZ2LnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI5MDRmNDJjYy03M2MzLTQ3ZWQtODdlNi01MDE3MzBlMTBkZjIiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzI4OTEyNjIwLCJpYXQiOjE3Mjg5MDkwMjAsImVtYWlsIjoiZXhhbXBsZUB0ZXN0Mi5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7ImVtYWlsIjoiZXhhbXBsZUB0ZXN0Mi5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwic3ViIjoiOTA0ZjQyY2MtNzNjMy00N2VkLTg3ZTYtNTAxNzMwZTEwZGYyIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3Mjg5MDkwMjB9XSwic2Vzc2lvbl9pZCI6IjQ0ZDZlNzhlLWVkZWEtNDcxMi1hNWQzLTdlYjQ2YTdlYmQ0ZCIsImlzX2Fub255bW91cyI6ZmFsc2V9.DfC-ghPPXmOeeiyP0HYIPdFy33hd2k0fTisz6rpN5V4";


export default function UserReport() {
    const { userId } = useParams(); // ID do usuário sendo denunciado
    const [reason, setReason] = useState('');
    const [reportingUserId, setReportingUserId] = useState(''); // Adicione aqui o ID do usuário que está reportando (pode vir de um contexto ou outra fonte)

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const reportData = {
            reportedUserId: userId, // ID de quem está sendo denunciado
            reason: reason, // Razão da denúncia
        };
    
        try {
            const response = await fetch(`http://25.52.167.55:5001/ReportUser`, { // Remove o reportingUserId da URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, 
                },
                body: JSON.stringify(reportData), // Envia apenas o reportedUserId e reason
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
            <Link className='back' to={'/profile'}><FiArrowLeft size={20}/></Link>
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
