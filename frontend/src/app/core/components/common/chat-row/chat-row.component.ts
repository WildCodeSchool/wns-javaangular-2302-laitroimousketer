import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SafeUrl } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { MediaService } from 'src/app/core/services/media.service';
import { ImagePopUpComponent } from '../../../components/common/image-pop-up/image-pop-up.component';
import { Chat } from 'src/app/core/models/chat.model';
import { User } from 'src/app/core/models/user.model';
import { Store } from '@ngrx/store';
import * as Reducer from 'src/app/store/reducers/index';
import * as userAction from 'src/app/store/actions/user.action';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-chat-row',
  templateUrl: './chat-row.component.html',
  styleUrls: ['./chat-row.component.scss'],
})
export class ChatRowComponent implements OnInit, OnChanges {
  @Input() message!: Chat;
  author!: string;
  mediaImageUrl$!: Observable<SafeUrl | null>;
  userConnected!: User;
  editMode: boolean = false;
  chatForm!: FormGroup;
  @Output() deleteMessageEvent = new EventEmitter<Chat>();
  @Output() editMessageEvent = new EventEmitter<Chat>();

  constructor(
    private mediaService: MediaService,
    private dialog: MatDialog,
    private store: Store<Reducer.StateDataStore>,
    private fb: FormBuilder,
    
  ) { }

  ngOnInit() {
    this.loadUserConnected();
    this.initChatForm();
    if (!!this.message.media) {
      this.mediaImageUrl$ = this.getMediaImageUrl();
    }
    // console.log("message", this.message)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message']) {
      this.mediaImageUrl$ = this.getMediaImageUrl();
    }
  }

  initChatForm() {
    this.chatForm = this.fb.group({
      message: ['',Validators.required],
    });
  }

  getMediaImageUrl(): Observable<SafeUrl | null> {
    // Vérifiez si user et user.media existent
    if (this.message && this.message.media) {
      return this.mediaService.getMediaById(this.message.media?.id).pipe(
        // tap(url => console.log('Media Image URL:', url || 'Image URL is null or undefined'))
      );
    } else {
      return of(null); // Si user ou user.media est null, retournez un Observable null
    }
  }

  openImagePopup(imageUrl: SafeUrl) {
    // console.log('imageUrl:', imageUrl);
    this.dialog.open(ImagePopUpComponent, {
      data: imageUrl,
      maxWidth: '96vw',
      maxHeight: '96vh',
    });
  }

  loadUserConnected() {
    this.store.select(Reducer.getUserConnected).subscribe((data: any) => {
      this.userConnected = data;
    });
  }

  deleteMessage() {
    this.deleteMessageEvent.emit(this.message);
  }

  editMessage() {
    this.editMode = true;
    const editedMessage: Chat = { ...this.message,  }; // Create a copy of the message
    this.chatForm.get('message')?.patchValue(this.message.message);
    this.editMessageEvent.emit(editedMessage); // Emit the edited message
  }
  
  onSave() {
    // Create a copy of the message
    const editedMessage: Chat = { ...this.message, message: this.chatForm.get('message')?.value };
    // Emit the edited message
    this.editMessageEvent.emit(editedMessage);
    this.editMode = false;
  }
  
  

  onCancel() {
    this.editMode = false;
  }
}