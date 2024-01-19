import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of, reduce, takeUntil, tap } from 'rxjs';
import { Chat } from 'src/app/core/models/chat.model';
import { Ticket } from 'src/app/core/models/ticket.model';
import { User } from 'src/app/core/models/user.model';
import { ChatService } from 'src/app/core/services/chat.service';
import { Store } from '@ngrx/store';
import * as Reducer from 'src/app/store/reducers/index';
import * as userAction from 'src/app/store/actions/user.action';
import { SafeUrl } from '@angular/platform-browser';
import { MediaService } from 'src/app/core/services/media.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { UnsubcribeComponent } from 'src/app/core/classes/unsubscribe.component';


@Component({
  selector: 'app-ticket-chat',
  templateUrl: './ticket-chat.component.html',
  styleUrls: ['./ticket-chat.component.scss']
})
export class TicketChatComponent extends UnsubcribeComponent implements OnInit {
  @Input() userCanChat: boolean = false;
  @Input() ticket?: Ticket;
  newMessage: string = '';
  messages: string[] = [];
  chat: Chat[] = [];
  userConnected!: User;
  chatForm!: FormGroup;
  uploadForm!: FormGroup;
  userMediaId: number = 0;
  fileSelected: boolean = false;
  selectedFileName: string = '';
  constructor(

    private chatService: ChatService,
    private fb: FormBuilder,
    private store: Store<Reducer.StateDataStore>,
    private mediaService: MediaService,
    private alertService: AlertService,

  ) {
    super();
  }

  ngOnInit() {
    this.loadUserConnected();
    this.initChatForm();
    this.getChatMessages();
    this.initUploadForm();

  }

  initChatForm() {
    this.chatForm = this.fb.group({
      message: [''],
      ticket_id: [this.ticket?.id],
      author: [this.userConnected],
      media: [null],
    });
  }

  initUploadForm() {
    this.uploadForm = this.fb.group({
      file: [''],
      chatId: [null],
    });
  }

  deleteMessage(message: Chat) {
    this.chatService.delete(message.id).subscribe((data: any) => {
      this.chatService.getWithQuery(`ticket_id=${this.ticket?.id}`).subscribe((data: any) => {
        // reload chat after sending with new ref for the array, this is for refreshing the view
        this.chat = [...data];
      });
    });
  }
  editMessage(editedMessage: Chat) {
    // Implement the logic to update the edited message in your data or service
    this.chatService.update(editedMessage).subscribe((data: any) => {
      this.chatService.getWithQuery(`ticket_id=${this.ticket?.id}`).subscribe((data: any) => {
        this.chat = [...data];
      });
    });
  }
  
  getChatMessages() {
    this.chatService.getWithQuery(`ticket_id=${this.ticket?.id}`).subscribe((data: any) => {
      // console.log("data chat with filters", data);
      this.chat = data;
    });
  }

  loadUserConnected() {
    this.store.select(Reducer.getUserConnected).subscribe((data: any) => {
      this.userConnected = data;
    });
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('file')?.setValue(file);
      this.fileSelected = true;
      this.selectedFileName = file.name;
    }
  }
  sendMessage() {
    // Sending the chat message
    if (this.userCanChat) {
    this.chatService.add(this.chatForm.value).subscribe((data: any) => {
      console.log("data chat", data);

      // Preparing FormData for file upload
      const formData = new FormData();
      formData.append('file', this.uploadForm.get('file')?.value);
      formData.append('chatId', data.id); // Assuming 'id' is the property containing the chat ID
      // console.log("form data", formData.append('chatId', data.id));
      this.chat = [...this.chat, data];
      this.chatForm.get('message')?.patchValue('');
      // Uploading the file
      if (!!this.fileSelected) {
        this.mediaService.addMedia(formData).pipe(takeUntil(this.destroy$)).subscribe({
          next: (response) => {
            this.chat.push(data);
   
            this.fileSelected = false;
            this.selectedFileName = '';
            this.chatService.getWithQuery(`ticket_id=${this.ticket?.id}`).subscribe((data: any) => {
              // reload chat after sending with new ref for the array, this is for refreshing the view
              this.chat = [...data];
            });
          },
          error: (error) => {
            console.error('Error uploading file:', error);
            this.alertService.showErrorAlert('Erreur lors de la mise à jour de l\'image !');
            // Handle error, e.g., show an error message to the user
          },
        });
      }
    
    });
  } else {
    this.fileSelected = false;
    this.chatForm.get('message')?.patchValue('');
    this.alertService.showErrorAlert("Pour envoyer un message, vous devez être l'auteur du ticket ou être assigné à celui-ci.");
  }
  }
  clearFileInput() {
    const fileInput = document.getElementById('file') as HTMLInputElement;
    fileInput.value = '';  // Réinitialiser la valeur de l'input file
    this.fileSelected = false;  // Réinitialiser votre indicateur fileSelected si nécessaire
    this.selectedFileName = '';
  }

}
