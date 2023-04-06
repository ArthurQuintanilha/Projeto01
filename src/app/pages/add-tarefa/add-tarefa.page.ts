import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Tarefa } from 'src/app/model/tarefa';
import { TarefaService } from 'src/app/services/tarefa.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular'
import { Validators } from '@angular/forms';
 

@Component({
  selector: 'app-add-tarefa',
  templateUrl: './add-tarefa.page.html',
  styleUrls: ['./add-tarefa.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AddTarefaPage implements OnInit {
  tarefa: Tarefa;
  tarefaService: TarefaService;
  public fGroup!: FormGroup;




  constructor(private fBuider: FormBuilder, private activatedRoute: ActivatedRoute, private toastController: ToastController, private navController: NavController) {
    this.fGroup = this.fBuider.group({
      'descricricao':  [''],
      'data': [''],
      'situacao': ['']


    });

    this.tarefaService = new TarefaService();
    let id = this.activatedRoute.snapshot.params['id'];

    if (id != null) {
      this.tarefa = this.tarefaService.buscarPorId(parseFloat(id));
    } else {
      this.tarefa = new Tarefa();
    }
  }

  ngOnInit() {


   }

  salvar() {
    this.tarefaService.salvar(this.tarefa);

    this.exibirMensagem('Registro salvo com sucesso!!!');
    this.navController.navigateBack('/tarefa');
  }
  async exibirMensagem(texto: string) {

    const toast = await this.toastController.create({

      message: texto,
      duration: 1500
    });


    toast.present();
  }



}
