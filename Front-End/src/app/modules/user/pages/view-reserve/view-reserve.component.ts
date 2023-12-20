import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { reserva_equip } from 'src/app/models/reserva_equips';
import { reservas_salas } from 'src/app/models/reserva_salas';
import { ReserveService } from 'src/app/services/reserve.service';

@Component({
  selector: 'app-view-reserve',
  templateUrl: './view-reserve.component.html',
  styleUrls: ['./view-reserve.component.css'],
})
export class ViewReserveComponent {
  salas: reservas_salas[] = [];
  equip: reserva_equip[] = [];
  selectedReserva: reserva_equip | null = null;
  reservaId: string = '';
  canEdit: boolean = false;
  reservaOriginal: reservas_salas | null = null;

  constructor(private reserveService: ReserveService) {}

  ngOnInit(): void {
    this.carregarReservas();
  }

  carregarReservas(): void {
     this.reserveService.getReservasSalas().subscribe(
      (data: reservas_salas[]) => {
        this.salas = data;
      },
      (error) => {
        console.error('Erro ao carregar reservas:', error);
        // Trate o erro, exiba uma mensagem ao usuário, etc.
      }
    );


    /* this.reserveService.getReservasEquipamentos().subscribe(
      (data: reserva_equip[]) => {
        console.log(data);
        this.equip = data;
      },
      (error) => {
        console.error('Erro ao carregar reservas:', error);
      }
    ); */
  }

  alterarReserva(){

  }

  habilitarEdicao(sala: reservas_salas): void {
    this.canEdit = true;
    this.reservaOriginal = { ...sala }; // Cria uma cópia da reserva original para uso no cancelamento
  }

  salvarEdicao(sala: reservas_salas): void {
    // Lógica para salvar a reserva editada usando this.reserveService.atualizarReserva(sala);
    this.canEdit = false;
  }

  cancelarEdicao(sala: reservas_salas): void {
    // Restaura os valores originais da reserva
    if (this.reservaOriginal) {
      Object.assign(sala, this.reservaOriginal);
      this.reservaOriginal = null;
    }
    this.canEdit = false;
  }

}