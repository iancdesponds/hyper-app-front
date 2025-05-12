import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { StyledLogin } from './styles';
import { Eye, EyeOff } from 'lucide-react';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <StyledLogin>
      <div className="login-container">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label>
            E-mail
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              placeholder="seu@email.com"
            />
          </label>
          
          <div className="password-input">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Senha"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />
  <button
    type="button"
    onClick={() => setShowPassword((s) => !s)}
  >
    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
  </button>
</div>
          
          <button type="submit">Entrar</button>
        </form>
        <p>
          Ainda não tem conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </div>
    </StyledLogin>
  );
}