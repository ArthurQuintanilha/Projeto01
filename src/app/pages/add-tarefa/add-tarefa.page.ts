import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class AddTarefaPage implements OnInit {
  tarefa: Tarefa;
  tarefaService: TarefaService;
  public fGroup!: FormGroup;




  constructor(private fBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private toastController: ToastController, private navController: NavController) {

    this.tarefaService = new TarefaService();
    let id = this.activatedRoute.snapshot.params['id'];

    if (id != null) {
      this.tarefa = this.tarefaService.buscarPorId(parseFloat(id));
    } else {
      this.tarefa = new Tarefa();
    }

    this.fGroup = this.fBuilder.group({

      descricao: this.tarefa.descricao,

      termino: this.tarefa.termino,

      situacao: this.tarefa.situacao,
    });

  }

  ngOnInit() {
    this.fGroup = this.fBuilder.group({
      descricao:
        ['', Validators.compose([
          Validators.required,
        ])],

      termino:
        ['', Validators.compose([
          Validators.required
        ])],

      situacao: ['']
    });
  }

  createForm() {
    this.fGroup = this.fBuilder.group({
      descricao: new FormControl(this.tarefa.descricao),
      termino: new FormControl(this.tarefa.termino),
      situacao: new FormControl(this.tarefa.situacao),

    })
  }

  salvar() {
    console.log(this.fGroup.value);
    if (this.fGroup.valid) {
      this.createForm();
      this.tarefaService.salvar(this.tarefa);
      this.exibirMensagem('Registro salvo com sucesso!!!');
      this.navController.navigateBack('/tarefa');
    }
  }

  async exibirMensagem(texto: string) {

    const toast = await this.toastController.create({

      message: texto,
      duration: 1500
    });


    toast.present();
  }



}


