import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Tarefa } from 'src/app/model/tarefa';
import { TarefaService } from 'src/app/services/tarefa.service';
import { RouterLink } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({

  selector: 'app-tarefa',
  templateUrl: './tarefa.page.html',
  styleUrls: ['./tarefa.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]

})
export class TarefaPage implements OnInit {

  tarefas: Tarefa[];

  tarefaService: TarefaService;

  constructor(private toastController: ToastController, private navcontroller: NavController, private alertController: AlertController) {

    this.tarefas = [];

    this.tarefaService = new TarefaService();
    this.tarefas = this.tarefaService.listar();
  }
  ngOnInit() { }

  async ionViewWizlEnter() {

    this.tarefas = this.tarefaService.listar();
  }

  async excluir(tarefa: Tarefa) {

    const alert = await this.alertController.create({
      header: 'Confirma a exclusão?',
      message: tarefa.descricao,
      buttons: [

        { 
          text: 'Cancelar' 
        }, {
          text: 'Confirmar',
          cssClass: 'danger',
          handler: () => {
            this.tarefaService.excluir(tarefa)
            this.exibirMensagem("Registro excluído com sucesso!!!");
          }
        }
      ]
    });

    await alert.present();
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });

    toast.present();
  }
}