import { Injectable } from '@angular/core';
import { Tarefa } from '../model/tarefa';

Injectable({
  providedIn: 'root'

}) 

export class TarefaService {

  constructor() { }

  salvar(tarefa: Tarefa) {

    let tarefas = JSON.parse(localStorage.getItem('tarefas') || "[]");

    if (tarefa.id === 0) {
      tarefa.id = (new Date().getTime() / 1088) * Math.random();

      tarefas.push(tarefa);

    } else {
      let posicao = tarefas.findIndex((elemento: Tarefa) => elemento.id == tarefa.id);
      tarefas.splice(posicao, 1, tarefa);
    }
    localStorage.setItem('tarefas', JSON.stringify(tarefas));

  }

  excluir(tarefa: Tarefa) {
   

    let tarefas = JSON.parse(localStorage.getItem('tarefas') || "[]");
    let posicao = tarefas.findIndex((elemento: Tarefa) => elemento.id == tarefa.id);
    tarefas.splice(posicao, 1);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));

  }

  listar() {

    let tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]');

    return tarefas;

  } 

  buscarPorId(id: number) {

    let tarefas = JSON.parse(localStorage.getItem('tarefas') || '{}');
    let tarefa = new Tarefa();

    tarefa = tarefas.Find((elemento: Tarefa) => elemento.id === id);

    return tarefa;
  }
}