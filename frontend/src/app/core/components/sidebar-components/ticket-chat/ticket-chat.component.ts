import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import { ChatMessage } from '../../../models/chatMessage.model';

@Component({
  selector: 'app-ticket-chat',
  templateUrl: './ticket-chat.component.html',
  styleUrls: ['./ticket-chat.component.scss']
})
export class TicketChatComponent implements OnInit {
  newMessage: string = '';
  messages: string[] = [];
  chatMessages: ChatMessage[] = [];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.getChatMessages();
    this.chatMessages = [
          {
            id: 1,
            text: 'Bonjour, comment ça va ?',
            sender: 'Alice',
            timestamp: new Date()
          },
          {
            id: 2,
            text: 'Salut, je vais bien, merci !',
            sender: 'Bob',
            timestamp: new Date()
          }
        ];
  }

  getChatMessages() {
    this.chatService.getChats().subscribe((data: any) => {
      this.chatMessages = data;
    });
  }


  sendMessage() {
    const chatMessage: ChatMessage = {
          id: 0, // L'identifiant sera généré par le serveur
          text: this.newMessage, // Supposons que 'text' est le champ de texte du message
          sender: 'Utilisateur', // Supposons que l'utilisateur est l'expéditeur
          timestamp: new Date() // Supposons que vous ajoutez un horodatage
        };

        this.chatService.addChat(chatMessage).subscribe(response => {
          // Vous pouvez gérer la réponse du serveur ici, par exemple, actualiser la liste de messages.
          this.getChatMessages();
          // Effacez le champ de texte du message après l'envoi.
          this.newMessage = '';
        });
  }


}
