import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Contact } from 'src/Contact';
import { ContactGql } from 'src/ContactGql';
import { CreateContactRequestBody } from 'src/CreateContactRequestBody';
import { FindContactByIdGql } from 'src/FindContactByIdGql';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  private contactUrl = 'http://localhost:8080/graphql';
  private params: Params | undefined

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    route.queryParams.subscribe((queryParam) => {
      this.params = queryParam
    })
  }


  public async getContacts(): Promise<ContactGql> {
    return await firstValueFrom(this.http.post<ContactGql>(this.contactUrl, "{ findAllContacts(page: 1) { id fullName emailAddress phoneNumber company { id name }}}"));
  }

  public getContactByIds(id: number): Promise<FindContactByIdGql> {
    return firstValueFrom(this.http.post<FindContactByIdGql>(this.contactUrl, `{ findContactById(id: ${id}) { firstName lastName emailAddress phoneNumber company { id name } comment status}}`));
  }

  public createContact(newContact: CreateContactRequestBody): Promise<CreateContactRequestBody> {
    return firstValueFrom(this.http.post<CreateContactRequestBody>(this.contactUrl, `mutation { addContact(firstName : "${newContact.firstName}", lastName : "${newContact.lastName}", emailAddress: "${newContact.emailAddress}", phoneNumber: "${newContact.phoneNumber}", comment: "${newContact.comment}", companyId : "${newContact.companyId}")}`));
  }

  public editContact(id: number, contact: CreateContactRequestBody): Promise<CreateContactRequestBody> {
    console.log(id);
    
    return firstValueFrom(this.http.post<CreateContactRequestBody>(this.contactUrl, `mutation { updateContact( id: "${id}", firstName : "${contact.firstName}", lastName : "${contact.lastName}", emailAddress: "${contact.emailAddress}", phoneNumber: "${contact.phoneNumber}", comment: "${contact.comment}", companyId : "${contact.companyId}")}`));
  }

  public deleteContact(id: number): Promise<Boolean> {
    console.log(id,"delete");
    
    return firstValueFrom(this.http.post<Boolean>(this.contactUrl, `mutation { deleteContact( id: "${id}")}`));
  }
}
