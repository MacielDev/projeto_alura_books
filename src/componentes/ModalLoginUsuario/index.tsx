import { AbBotao, AbCampoTexto, AbModal } from "ds-alurabooks"
import { useState } from "react"
import './ModalLoginUsuario.css'
import imagemPrincipal from './assets/login.png'
import axios from "axios";

interface PropsModalLoginUsuario{
  aberta:boolean;
  aoFechar: () => void
  aoEfetuarLogin: () => void
}

const ModalLoginUsuario = ({aberta,aoFechar}:PropsModalLoginUsuario) => {
  const [email,setEmail] = useState("")
  const [senha,setSenha] =useState("")

  const aoSubmeterFormulario = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const usuario ={
      email,
      senha
    }
    axios.post('http://localhost:8000/public/login',usuario)
      .then(resposta => {
        sessionStorage.setItem('token', resposta.data.access_token)
        setEmail('')
        setSenha('')
    
      })
      .catch(erro => {
        if(erro?.response?.data?.message){
          alert(erro.response.data.message)
        }else{
          alert("Aconteceu um erro inesperado ao efetuar o seu login")
        }
      })
  }

  return (
    <AbModal
      titulo="Login"
      aberta={aberta}
      aoFechar={aoFechar}
    >
      <section className="corpoModalLogin">
        <figure>
          <img src={imagemPrincipal} alt="Pessoa segurando uma chave na frente de uma tela de computador que está exibindo uma fechadura"/>
        </figure>
          <form onSubmit={aoSubmeterFormulario}>
            <AbCampoTexto 
              label={"E-mail"}
              type={"email"} 
              placeholder={"seuemail@maneiro.com.br"}
              value={email} 
              onChange={setEmail}
            />
            <AbCampoTexto
              label={"Senha"}
              type={"password"} 
              placeholder={"******"}
              value={senha} 
              onChange={setSenha}
            />
            <div className="acoes">
              <a href="#">Esqueci minha senha</a>
              <AbBotao texto="Fazer Login" />
            </div>
          </form>
      </section>
      
    </AbModal>
  )
}

export default ModalLoginUsuario