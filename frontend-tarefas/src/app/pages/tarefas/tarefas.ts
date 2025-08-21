import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// A interface em TypeScript é usada para definir a **estrutura de um objeto**.
// Ela serve como um **modelo**, dizendo quais propriedades esse objeto deve ter.
interface Tarefa {
// O "id" é opcional (por causa do ponto de interrogação `?`)
// Isso significa que nem sempre é necessário informar esse campo (por exemplo, ao criar uma nova tarefa).
id?: number;
// O "titulo" é obrigatório e deve ser uma string.
titulo: string;
// O "descricao" também é obrigatório e do tipo string.
descricao: string;
// O "status" indica se a tarefa está "pendente" ou "concluida".
status: string;
}
@Component({
selector: 'app-tarefas',
standalone: true,
imports: [CommonModule, FormsModule, HttpClientModule],
templateUrl: './tarefas.html',
styleUrls: ['./tarefas.css'],
})
// Classe principal do componente
export class Tarefas implements OnInit {
// Lista de tarefas carregadas do backend
tarefas: Tarefa[] = [];
// Objeto usado para adicionar uma nova tarefa (preenchido no formulário)
novaTarefa: Tarefa = { titulo: '', descricao: '', status: 'pendente' };
// mensagemSucesso: boolean = false;
mensagem: string = '';
tipoMensagem: 'success' | 'danger' | 'warning' | 'info' = 'success';
// Injeta o serviço HttpClient para fazer requisições HTTP
constructor(private http: HttpClient) {}
// Método chamado automaticamente quando o componente é iniciado
ngOnInit() {
this.buscarTarefas(); // Carrega
}
// Busca todas as tarefas do backend via GET
buscarTarefas() {
this.http
.get<Tarefa[]>('http://localhost:3000/tarefas') // Faz a requisição
.subscribe((res) => (this.tarefas = res)); // Salva a resposta na lista local
}
adicionarTarefa() {
this.http
.post<Tarefa>('http://localhost:3000/tarefas', this.novaTarefa)
.subscribe(() => {
this.novaTarefa = { titulo: '', descricao: '', status: 'pendente' };
this.buscarTarefas();
this.exibirMensagem('Tarefa cadastrada com sucesso!', 'success');
});
}
// Marca uma tarefa como "concluída" via PATCH
concluirTarefa(tarefa: Tarefa) {
this.http
.patch(`http://localhost:3000/tarefas/${tarefa.id}`, {
status: 'concluida',
}) // Atualiza só o campo status
.subscribe(() => {
this.exibirMensagem(`Tarefa "${tarefa.titulo}" concluída!`, 'info');
this.buscarTarefas(); // Atualiza a lista
});
}
// Exclui uma tarefa do backend via DELETE
excluirTarefa(id: number) {
this.http.delete(`http://localhost:3000/tarefas/${id}`).subscribe(() => {
this.exibirMensagem('Tarefa excluída com sucesso.', 'danger');
this.buscarTarefas();
});
}
exibirMensagem(
texto: string,
tipo: 'success' | 'danger' | 'warning' | 'info' = 'success'
) {
this.mensagem = texto;
this.tipoMensagem = tipo;
// Esconde depois de 3 segundos
setTimeout(() => {
this.mensagem = '';
}, 3000);
}
}