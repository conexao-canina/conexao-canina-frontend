import React, { useState } from "react";
import styles from "./VerificationRequest.module.css";

const VerificationRequest = () => {
  const [document, setDocument] = useState(null);
  const [method, setMethod] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isVerified, setIsVerified] = useState(false); // Status de verificação

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!document || !method) {
      setFeedback("Por favor, preencha todos os campos antes de enviar.");
      return;
    }

    // Simular envio e verificação
    setFeedback("Solicitação enviada, aguardando análise.");
    setTimeout(() => {
      setIsVerified(true); // Simula aprovação
      setFeedback("Parabéns! Sua conta foi verificada.");
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Solicitação de Verificação de Identidade</h2>

      {/* Exibição do perfil */}
      <div className={styles.profile}>
        <h3 className={styles.profileTitle}>Perfil do Usuário</h3>
        <p className={styles.profileName}>Nome do Usuário</p>
        {isVerified ? (
          <span className={styles.verifiedBadge}>Verificado ✅</span>
        ) : (
          <span className={styles.notVerifiedBadge}>Não Verificado ❌</span>
        )}
      </div>

      {/* Formulário de solicitação */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="document" className={styles.label}>
            Upload do Documento
          </label>
          <input
            type="file"
            id="document"
            accept="image/*,.pdf"
            onChange={(e) => setDocument(e.target.files[0])}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="method" className={styles.label}>
            Método de Verificação
          </label>
          <select
            id="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className={styles.select}
          >
            <option value="">Selecione um método</option>
            <option value="email">Verificação por E-mail</option>
            <option value="telefone">Verificação por Telefone</option>
          </select>
        </div>

        <button type="submit" className={styles.button}>
          Enviar Solicitação
        </button>
      </form>

      {feedback && <p className={styles.feedback}>{feedback}</p>}
    </div>
  );
};

export default VerificationRequest;