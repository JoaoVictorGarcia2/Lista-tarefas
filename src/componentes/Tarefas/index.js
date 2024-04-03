import React, { useState, useEffect } from 'react';
import './tarefas.css';
import X from './img/x.png';
import C from './img/c.png';
import S from './img/s.png';
import L from './img/l.png';

function Tarefas() {
  const [tarefas, setTarefas] = useState({
    afazer: [],
    emprogresso: [],
    concluidas: []
  });
  const [novaTarefaInput, setNovaTarefaInput] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Trabalho');

  useEffect(() => {
    const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas'));
    if (tarefasSalvas) {
      setTarefas(tarefasSalvas);
    }
  }, []);

  const atualizarTarefas = (novasTarefas) => {
    setTarefas(novasTarefas);
    localStorage.setItem('tarefas', JSON.stringify(novasTarefas));
  };

  const adicionarTarefa = () => {
    if (novaTarefaInput) {
      const novaTarefa = {
        descricao: novaTarefaInput,
        tipo: categoriaSelecionada
      };
      const novasTarefas = {
        ...tarefas,
        afazer: [...tarefas.afazer, novaTarefa]
      };
      setNovaTarefaInput('');
      atualizarTarefas(novasTarefas);
    }
  };

  const handleChangeCategoria = (event) => {
    setCategoriaSelecionada(event.target.value);
  };

  const moverParaEmProgresso = (index) => {
    const tarefaMovida = tarefas.afazer[index];
    const novasTarefas = {
      afazer: tarefas.afazer.filter((_, i) => i !== index),
      emprogresso: [...tarefas.emprogresso, tarefaMovida],
      concluidas: tarefas.concluidas
    };
    atualizarTarefas(novasTarefas);
  };

  const marcarConcluido = (categoria, index) => {
    const tarefaConcluida = tarefas[categoria][index];
    const novasTarefas = {
      ...tarefas,
      [categoria]: tarefas[categoria].filter((_, i) => i !== index),
      concluidas: [...tarefas.concluidas, tarefaConcluida]
    };
    atualizarTarefas(novasTarefas);
  };

  const marcarNaoConcluido = (categoria, index) => {
    const tarefaNaoConcluida = tarefas[categoria][index];
    const novasTarefas = {
      ...tarefas,
      [categoria]: tarefas[categoria].filter((_, i) => i !== index),
      afazer: [...tarefas.afazer, tarefaNaoConcluida]
    };
    atualizarTarefas(novasTarefas);
  };

  const excluirTarefa = (categoria, index) => {
    const novasTarefas = {
      ...tarefas,
      [categoria]: tarefas[categoria].filter((_, i) => i !== index)
    };
    atualizarTarefas(novasTarefas);
  };

  return (
    <>
      <header className="topo">
        <div className='topo_esquerda'>
          <h1>Adicionar tarefa</h1>
          <input
            type='text'
            placeholder='Escreva aqui a tarefa!'
            value={novaTarefaInput}
            onChange={(event) => setNovaTarefaInput(event.target.value)}
          />
          <select value={categoriaSelecionada} onChange={handleChangeCategoria}>
            <option value="Trabalho">Trabalho</option>
            <option value="Pessoal">Pessoal</option>
            <option value="Estudos">Estudos</option>
          </select>
          <button onClick={adicionarTarefa}>Adicionar</button>
        </div>
      </header>
      <div className='topo_false'></div>

      <main>
        <h1 className='titulo'>TAREFAS</h1>
        <div className='principal'>
          <div className='caixa_tarefas'>
            <h2>A fazer</h2>
            <div className='tarefas'>
              {tarefas.afazer.map((tarefa, index) => (
                <div key={index}>
                  <div id="tipo-tarefa">{tarefa.tipo}</div>
                  {tarefa.descricao}
                  <div id="cxBtn">
                    <button className='btn_comecar' onClick={() => moverParaEmProgresso(index)}><img src={S} alt="Começar" /></button>
                    <button className='btn_excluir' onClick={() => excluirTarefa('afazer', index)}><img src={L} alt="Excluir" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='caixa_tarefas'>
            <h2>Em progresso</h2>
            <div className='tarefas cor2'>
              {tarefas.emprogresso.map((tarefa, index) => (
                <div key={index}>
                  <div id="tipo-tarefa">{tarefa.tipo}</div> 
                  {tarefa.descricao}
                  <div id="cxBtn">
                    <button className='btn_fazer' onClick={() => marcarConcluido('emprogresso', index)}><img src={C} alt="Fazer" /></button>
                    <button className='btn_nao_fazer' onClick={() => marcarNaoConcluido('emprogresso', index)}><img src={X} alt="Não Fazer" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='caixa_tarefas'>
            <h2>Concluído</h2>
            <div className='tarefas cor3'>
              {tarefas.concluidas.map((tarefa, index) => (
                <div key={index}>
                  <div id="tipo-tarefa">{tarefa.tipo}</div>
                  {tarefa.descricao}
                  <div id="cxBtn">
                    <button className='btn_nao_fazer' onClick={() => marcarNaoConcluido('concluidas', index)}><img src={X} alt="Não Fazer" /></button>
                    <button className='btn_excluir' onClick={() => excluirTarefa('concluidas', index)}><img src={L} alt="Excluir" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Tarefas;
