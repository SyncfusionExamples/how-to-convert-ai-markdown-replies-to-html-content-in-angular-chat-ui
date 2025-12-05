import { Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatUIModule, ChatUIComponent } from '@syncfusion/ej2-angular-interactive-chat';
import { UserModel, MessageSendEventArgs } from '@syncfusion/ej2-interactive-chat';
import { GeminiAI } from './ai-model';
import {marked} from 'marked';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [FormsModule, ReactiveFormsModule, ChatUIModule],
  templateUrl: './app.html'
})
export class App {
  @ViewChild('chatUI') chatUIComponent!: ChatUIComponent;
  public currentUserModel: UserModel = { user: 'Customer', id: 'user1' };
  public syncfusionUserModel: UserModel = { user: 'Syncfusion Bot', id: 'user2', avatarUrl: 'assets/images/Mascot-1.png' };
  public typingUsers: UserModel[] = [this.syncfusionUserModel];
  public onMessageSend = async (args: MessageSendEventArgs): Promise<void> => {
    const customerMessage = args.message?.text?.trim();
    if (customerMessage) {
      try {
        this.chatUIComponent.typingUsers = [this.syncfusionUserModel];
        const responseText = await GeminiAI(customerMessage);
        this.chatUIComponent.typingUsers = [];
        const html = marked.parse(responseText?.text || '');
        this.chatUIComponent.addMessage({
          text: html as any,
          author: this.syncfusionUserModel
        });
      } catch (error) {
        console.error('AI Error:', error);
        this.chatUIComponent.typingUsers = [];
        this.chatUIComponent.addMessage({
          text: "Sorry, I couldn't get a response.",
          author: this.syncfusionUserModel
        });
      }
    }
  };
}